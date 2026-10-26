// Authentication & User State Management
const AUTH_STORAGE_KEY = 'kickvault_user';

function getCurrentUser() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function loginUser(email, password) {
  if (!email || !password) {
    showToast("Please provide both email and password.", "error");
    return false;
  }

  // Pre-configured mock user or any email
  const nameFromEmail = email.split('@')[0];
  const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

  const user = {
    name: formattedName || "Sneakerhead",
    email: email.trim().toLowerCase(),
    avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80`,
    shoeSize: "US 9.5",
    joinedDate: "October 2026",
    memberTier: "Gold VIP Member"
  };

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  showToast(`Welcome back, ${user.name}! 👋`, "success");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);

  return true;
}

function signupUser(name, email, password, shoeSize = "US 9.5") {
  if (!name || !email || !password) {
    showToast("Please fill in all required fields.", "error");
    return false;
  }

  if (password.length < 6) {
    showToast("Password must be at least 6 characters.", "error");
    return false;
  }

  const user = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80`,
    shoeSize: shoeSize,
    joinedDate: "October 2026",
    memberTier: "Starter Club"
  };

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  showToast(`Account created! Welcome to KickVault, ${user.name}! 👟`, "success");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1200);

  return true;
}

function logoutUser() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  showToast("You have been signed out.", "info");
  renderNavAuth();
  setTimeout(() => {
    window.location.href = "index.html";
  }, 800);
}

function renderNavAuth() {
  const user = getCurrentUser();
  const authContainers = document.querySelectorAll('.nav-auth-container');

  authContainers.forEach(container => {
    if (user) {
      container.innerHTML = `
        <div class="relative group">
          <button class="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer" id="user-menu-btn" aria-label="User Menu">
            <img src="${user.avatar}" alt="${user.name}" class="w-8 h-8 rounded-full object-cover border-2 border-red-500 shadow-sm" />
            <span class="text-sm font-semibold text-slate-800 hidden lg:inline-block max-w-[100px] truncate">${user.name}</span>
            <svg class="w-4 h-4 text-slate-500 hidden lg:inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          
          <!-- Dropdown menu -->
          <div class="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 hidden group-hover:block hover:block z-50 animate-fadeIn">
            <div class="px-4 py-3 border-b border-slate-100">
              <p class="text-xs text-slate-400 font-medium uppercase tracking-wider">Signed in as</p>
              <p class="text-sm font-bold text-slate-900 truncate">${user.email}</p>
              <span class="inline-block mt-1 px-2 py-0.5 bg-amber-50 text-amber-600 rounded-md text-xs font-semibold">${user.memberTier}</span>
            </div>
            <div class="py-1">
              <a href="#" onclick="showToast('Profile view is simulated in this demo!', 'info'); return false;" class="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition">
                <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                My Profile
              </a>
              <a href="#" onclick="showToast('Order tracking history is simulated in this demo!', 'info'); return false;" class="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition">
                <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                My Orders
              </a>
              <a href="cart.html" class="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition">
                <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                Shopping Bag
              </a>
            </div>
            <div class="border-t border-slate-100 pt-1">
              <button onclick="logoutUser()" class="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition font-medium cursor-pointer">
                <svg class="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      `;
    } else {
      container.innerHTML = `
        <a href="login.html" class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-slate-700 hover:text-red-500 hover:bg-slate-100 transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          <span>Sign In</span>
        </a>
      `;
    }
  });

  // Mobile menu auth display
  const mobileAuth = document.getElementById('mobile-auth-container');
  if (mobileAuth) {
    if (user) {
      mobileAuth.innerHTML = `
        <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl mb-4 border border-slate-100">
          <img src="${user.avatar}" alt="${user.name}" class="w-10 h-10 rounded-full object-cover border-2 border-red-500" />
          <div class="flex-1 min-w-0">
            <p class="font-bold text-slate-900 truncate">${user.name}</p>
            <p class="text-xs text-slate-500 truncate">${user.email}</p>
          </div>
        </div>
        <button onclick="logoutUser()" class="w-full py-2.5 px-4 rounded-xl bg-rose-50 text-rose-600 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-rose-100 transition cursor-pointer">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Sign Out
        </button>
      `;
    } else {
      mobileAuth.innerHTML = `
        <div class="grid grid-cols-2 gap-3 pt-2">
          <a href="login.html" class="py-2.5 px-4 text-center rounded-xl border border-slate-200 text-slate-800 font-semibold text-sm hover:bg-slate-50 transition">
            Sign In
          </a>
          <a href="signup.html" class="py-2.5 px-4 text-center rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 shadow-md shadow-red-500/20 transition">
            Register
          </a>
        </div>
      `;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderNavAuth();
});
