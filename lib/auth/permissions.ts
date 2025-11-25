// lib/auth/permissions.ts
import { UserRole, ROLE_PERMISSIONS, Permission } from './roles';

type User = {
  id: string;
  role: UserRole;
};

type Resource = {
  ownerId?: string;
  [key: string]: any;
};

/**
 * ABAC (Attribute-Based Access Control) Kontrolü
 * Kullanıcının rolüne ve kaynağın özelliklerine (sahibiyet gibi) bakarak izin verir.
 */
export function can(user: User, action: Permission, resource?: Resource): boolean {
  if (!user || !user.role) return false;

  // 1. Adım: Statik Rol Kontrolü (RBAC)
  const userPermissions = ROLE_PERMISSIONS[user.role] || [];
  const hasStaticPermission = userPermissions.includes(action);

  // Admin her şeyi yapabilir (Superuser)
  if (user.role === UserRole.ADMIN) return true;

  if (!hasStaticPermission) return false;

  // 2. Adım: Dinamik Özellik Kontrolü (ABAC)
  if (resource) {
    // Seller sadece kendi ürününü düzenleyebilir/silebilir
    if (user.role === UserRole.SELLER) {
      if (action === Permission.EDIT_PRODUCT || action === Permission.DELETE_PRODUCT) {
        return resource.ownerId === user.id;
      }
      // Seller sadece kendisine atanan veya kendi ürünlerini içeren siparişleri yönetebilir
      if (action === Permission.MANAGE_ORDERS) {
        // Örnek: resource.sellerIds array'i içinde user.id var mı kontrolü
        return resource.sellerId === user.id; 
      }
    }
    
    // Customer sadece kendi siparişini görüntüleyebilir
    if (user.role === UserRole.CUSTOMER) {
       if (action === Permission.VIEW_ORDERS) {
         return resource.userId === user.id;
       }
    }
  }

  // Kaynak belirtilmediyse veya ABAC kuralı yoksa statik izne güven
  return true;
}