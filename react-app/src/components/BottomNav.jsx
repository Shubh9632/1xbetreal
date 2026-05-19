import { useEffect } from 'react';

// BottomNav component
// Injects the .bottom-nav bar and handles before/after login states.
// Mirrors the original updateUI() bottom-nav logic exactly.
export default function BottomNav() {
  useEffect(() => {
    function renderBottomNav() {
      const isLogged = localStorage.getItem('token');
      let nav = document.querySelector('.bottom-nav');

      if (!nav) {
        nav = document.createElement('div');
        nav.className = 'bottom-nav';
        nav.style.cssText =
          'position:fixed; bottom:0; left:0; width:100%; height:65px; background-color:#4a90e2 !important; display:flex; justify-content:space-around; align-items:center; z-index:999999 !important; padding-bottom:env(safe-area-inset-bottom, 10px); box-sizing:content-box; box-shadow:0 -2px 10px rgba(0,0,0,0.2);';
        document.body.appendChild(nav);
      }

      if (isLogged) {
        // After Login Footer (5 items)
        nav.innerHTML = `
          <a href="#" class="bottom-nav-item" onclick="location.reload()" style="display:flex; flex-direction:column; align-items:center; color:white !important; text-decoration:none; font-size:10px; font-weight:600; min-width:60px;">
            <div style="background:#333; border-radius:10px; width:32px; height:32px; display:flex; align-items:center; justify-content:center; margin-bottom:2px;">
              <i class="fa fa-home" style="font-size:18px; color:white;"></i>
            </div>
            Home
          </a>
          <a href="#" class="bottom-nav-item" onclick="showInplay(event)" style="display:flex; flex-direction:column; align-items:center; color:rgba(255,255,255,0.7) !important; text-decoration:none; font-size:10px; min-width:60px;">
            <i class="fa fa-play" style="font-size:20px; margin-bottom:4px;"></i>
            Inplay
          </a>
          <a href="#" class="bottom-nav-item" onclick="showMyMarkets(event)" style="display:flex; flex-direction:column; align-items:center; color:rgba(255,255,255,0.7) !important; text-decoration:none; font-size:10px; min-width:60px;">
            <i class="fa fa-eye" style="font-size:20px; margin-bottom:4px;"></i>
            My Markets
          </a>
          <a href="#" class="bottom-nav-item" onclick="showReferral(event)" style="display:flex; flex-direction:column; align-items:center; color:rgba(255,255,255,0.7) !important; text-decoration:none; font-size:10px; min-width:60px;">
            <i class="fa fa-user-plus" style="font-size:20px; margin-bottom:4px;"></i>
            Referral
          </a>
          <a href="#" class="bottom-nav-item" onclick="showDepositWithdrawReport(event)" style="display:flex; flex-direction:column; align-items:center; color:rgba(255,255,255,0.7) !important; text-decoration:none; font-size:10px; min-width:60px;">
            <i class="fa fa-book" style="font-size:20px; margin-bottom:4px;"></i>
            Passbook
          </a>
        `;
      } else {
        // Before Login Footer (3 items)
        nav.innerHTML = `
          <a href="#" class="bottom-nav-item" onclick="location.reload()" style="display:flex; flex-direction:column; align-items:center; color:white !important; text-decoration:none; font-size:10px; font-weight:600; min-width:80px;">
            <div style="background:#333; border-radius:10px; width:32px; height:32px; display:flex; align-items:center; justify-content:center; margin-bottom:2px;">
              <i class="fa fa-home" style="font-size:18px; color:white;"></i>
            </div>
            Home
          </a>
          <a href="#" class="bottom-nav-item" onclick="showInplay(event)" style="display:flex; flex-direction:column; align-items:center; color:rgba(255,255,255,0.7) !important; text-decoration:none; font-size:10px; min-width:80px;">
            <i class="fa fa-play" style="font-size:20px; margin-bottom:4px;"></i>
            Inplay
          </a>
          <a href="#" class="bottom-nav-item" style="display:flex; flex-direction:column; align-items:center; color:rgba(255,255,255,0.7) !important; text-decoration:none; font-size:10px; min-width:80px;">
            <i class="fa fa-gift" style="font-size:20px; margin-bottom:4px;"></i>
            Offers
          </a>
        `;
      }
    }

    renderBottomNav();

    // Re-render when login state changes (e.g., after Demo login reload)
    const interval = setInterval(renderBottomNav, 1500);
    return () => clearInterval(interval);
  }, []);

  return null;
}
