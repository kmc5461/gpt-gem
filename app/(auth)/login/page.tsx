import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md bg-white p-8 md:p-12 shadow-xl shadow-zinc-200/50">
        <div className="text-center mb-10">
          <Link
            href="/"
            className="text-3xl font-heading font-black tracking-tighter block mb-2"
          >
            ARCHETYPE.
          </Link>
          <p className="text-sm text-zinc-500 uppercase tracking-widest">
            Welcome Back
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 block">
              Email
            </label>
            <input
              type="email"
              className="w-full p-4 bg-zinc-50 border border-zinc-200 outline-none focus:border-black focus:bg-white transition-colors text-sm"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Password
              </label>

              {/* ✔ DÜZELTİLDİ: class → className */}
              <Link
                href="/forgot-password"
                className="text-[10px] font-bold uppercase text-zinc-400 hover:text-black"
              >
                Forgot?
              </Link>
            </div>

            <input
              type="password"
              className="w-full p-4 bg-zinc-50 border border-zinc-200 outline-none focus:border-black focus:bg-white transition-colors text-sm"
            />
          </div>

          <button className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest text-sm hover:bg-zinc-800 transition-colors">
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center border-t border-zinc-100 pt-8">
          <p className="text-xs text-zinc-500 mb-4">Don't have an account?</p>

          <Link
            href="/register"
            className="block w-full border border-black py-4 font-bold uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
