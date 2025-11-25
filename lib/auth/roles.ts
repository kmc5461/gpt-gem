// lib/auth/roles.ts

export enum UserRole {
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
  CUSTOMER = 'CUSTOMER',
  SUPPORT = 'SUPPORT'
}

export enum Permission {
  VIEW_DASHBOARD = 'view:dashboard',
  MANAGE_USERS = 'manage:users',
  MANAGE_PRODUCTS = 'manage:products',
  CREATE_PRODUCT = 'create:product',
  EDIT_PRODUCT = 'edit:product',
  DELETE_PRODUCT = 'delete:product',
  VIEW_ORDERS = 'view:orders',
  MANAGE_ORDERS = 'manage:orders',
  HANDLE_RMA = 'handle:rma',
  VIEW_ANALYTICS = 'view:analytics',
}

// Rol tabanlı statik izinler (RBAC)
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    Permission.VIEW_DASHBOARD,
    Permission.MANAGE_USERS,
    Permission.MANAGE_PRODUCTS,
    Permission.CREATE_PRODUCT,
    Permission.EDIT_PRODUCT,
    Permission.DELETE_PRODUCT,
    Permission.VIEW_ORDERS,
    Permission.MANAGE_ORDERS,
    Permission.HANDLE_RMA,
    Permission.VIEW_ANALYTICS
  ],
  [UserRole.SELLER]: [
    Permission.VIEW_DASHBOARD,
    Permission.CREATE_PRODUCT,
    Permission.EDIT_PRODUCT, // Sadece kendi ürünleri (ABAC kontrolü gerekir)
    Permission.DELETE_PRODUCT, // Sadece kendi ürünleri
    Permission.VIEW_ORDERS,
    Permission.MANAGE_ORDERS // Sadece kendi siparişleri
  ],
  [UserRole.SUPPORT]: [
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_ORDERS,
    Permission.HANDLE_RMA,
    Permission.VIEW_USERS // Sadece görüntüleme
  ] as unknown as Permission[], // Support'un görebileceği ekstra izinler tanımlanabilir
  [UserRole.CUSTOMER]: [
    // Müşterilerin admin panel erişimi yoktur, burası genellikle boştur veya frontend kısıtları içindir
  ]
};