// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { UserRole } from "@/lib/auth/roles";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Giriş yapmamış kullanıcıyı login'e at (withAuth bunu otomatik yapar ama ek kontrol)
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Admin Rotaları Koruması
    if (path.startsWith("/admin") && token.role !== UserRole.ADMIN) {
      // Yetkisiz erişim sayfasına yönlendir
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Seller Rotaları Koruması
    if (path.startsWith("/seller") && token.role !== UserRole.SELLER && token.role !== UserRole.ADMIN) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Support Rotaları Koruması
    if (path.startsWith("/support") && token.role !== UserRole.SUPPORT && token.role !== UserRole.ADMIN) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // authorized: ({ token }) => !!token, // Token varsa true döner, detaylı logic yukarıda
      authorized: ({ token }) => true, // Middleware fonksiyonu içinde kontrol ettiğimiz için true dönüyoruz
    },
  }
);

// Hangi yolların korunacağını belirt
export const config = {
  matcher: [
    "/admin/:path*",
    "/seller/:path*",
    "/support/:path*",
    "/profile/:path*"
  ]
};
