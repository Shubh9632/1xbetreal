import { useEffect } from 'react';

// Sidebar component
// Injects the custom sidebar overlay exactly as the original index.html script did.
// Uses useEffect to run after DOM is ready (equivalent to DOMContentLoaded).
export default function Sidebar() {
  useEffect(() => {
    // Prevent double injection
    if (document.getElementById('customSidebar')) return;

    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    sidebar.id = 'customSidebar';

    sidebar.innerHTML = `
      <div class="sidebar-header" style="background-color: #4a90e2 !important; padding: 0 15px; display: flex; align-items: center; justify-content: space-between; height: 85px !important; box-sizing: border-box; position: relative;">
        <a href="https://1xbetreal.com/" style="text-decoration: none; display: flex; align-items: center; margin-top: 5px;">
          <img src="/Screenshot_2026-05-10_020828-removebg-preview.png" style="height: 32px !important; width: auto; object-fit: contain;">
        </a>
        <div style="background: white; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); margin-top: 5px;" onclick="toggleSidebar()">
          <i class="fa fa-chevron-left" style="color: #4a90e2; font-size: 14px; margin-right: 1px;"></i>
        </div>
      </div>
      <div class="sidebar-user" id="sidebar-user-bar" style="padding: 14px 20px; background-color: #d8d8d8; display: flex; align-items: center; border-bottom: 1px solid #bbb;">
        <i class="fa fa-user" style="font-size:24px; margin-right:15px; color: #000;"></i>
        <span style="font-weight: 600; color: #000; font-size: 18px;">Demo</span>
      </div>
      <div class="sidebar-menu" style="background-color: #eee; flex: 1; overflow-y: auto; display: flex; flex-direction: column;">

        <!-- Bonus Card -->
        <div style="margin: 10px 10px 2px; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <i class="fa fa-gift" style="font-size: 18px; color: #555;"></i>
              <span style="font-weight: bold; font-size: 15px; color: #222;">Bonus</span>
            </div>
            <div style="display: flex; gap: 6px;">
              <span style="font-size: 11px; color: #555; cursor: pointer; text-decoration: underline;">Rules</span>
              <span style="font-size: 11px; background: #e8e8e8; border-radius: 4px; padding: 2px 7px; color: #333; cursor: pointer; font-weight: 500;">Statement</span>
            </div>
          </div>
          <div style="border-top: 1px solid #f0f0f0; padding: 8px 14px;">
            <div style="font-size: 12px; color: #444; margin-bottom: 3px;">Total Bonus: <span style="color: #e44;">0</span></div>
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="font-size: 12px; color: #444;">Claimable Bonus: <span style="color: #e44;">0</span></div>
              <button style="background: #ddd; color: #999; border: none; border-radius: 5px; padding: 4px 14px; font-size: 12px; cursor: not-allowed;">Claim</button>
            </div>
          </div>
          <div style="border-top: 1px solid #f0f0f0; padding: 7px 14px;">
            <div style="font-size: 11px; color: #888;">Min. Claimable Coins: 100</div>
          </div>
        </div>

        <!-- Menu Items -->
        <a href="#" class="sidebar-item" style="padding: 13px 20px; display: flex; align-items: center; color: #333; text-decoration: none; border-bottom: 1px solid #ddd; background: white; margin-top: 6px;" onclick="handleSidebarNav(event, ['profile', 'my account'])">
          <i class="fa fa-user" style="width: 30px; font-size: 18px; color: #444;"></i>
          <span style="font-weight: 500;">Profile</span>
        </a>
        <a href="#" class="sidebar-item" style="padding: 13px 20px; display: flex; align-items: center; color: #333; text-decoration: none; border-bottom: 1px solid #ddd; background: white;" onclick="showWithdrawalDetails(event)">
          <i class="fa fa-university" style="width: 30px; font-size: 18px; color: #444;"></i>
          <span style="font-weight: 500;">Withdrawal Details</span>
        </a>
        <a href="#" class="sidebar-item" style="padding: 13px 20px; display: flex; align-items: center; color: #333; text-decoration: none; border-bottom: 1px solid #ddd; background: white;" onclick="showAccountStatement(event)">
          <i class="fa fa-file-text" style="width: 30px; font-size: 18px; color: #444;"></i>
          <span style="font-weight: 500;">Account Statement</span>
        </a>
        <a href="#" class="sidebar-item" style="padding: 13px 20px; display: flex; align-items: center; color: #333; text-decoration: none; border-bottom: 1px solid #ddd; background: white;" onclick="showDepositWithdrawReport(event)">
          <i class="fa fa-file-image-o" style="width: 30px; font-size: 18px; color: #444;"></i>
          <span style="font-weight: 500;">Deposit/Withdraw Report</span>
        </a>
        <a href="#" class="sidebar-item" style="padding: 13px 20px; display: flex; align-items: center; color: #333; text-decoration: none; border-bottom: 1px solid #ddd; background: white;" onclick="handleSidebarNav(event, ['active bets', 'open bets'])">
          <i class="fa fa-flag" style="width: 30px; font-size: 18px; color: #444;"></i>
          <span style="font-weight: 500;">Active Bets</span>
        </a>
        <a href="#" class="sidebar-item" style="padding: 13px 20px; display: flex; align-items: center; color: #333; text-decoration: none; border-bottom: 1px solid #ddd; background: white;" onclick="handleSidebarNav(event, ['edit stake', 'edit stakes'])">
          <i class="fa fa-pencil-square-o" style="width: 30px; font-size: 18px; color: #444;"></i>
          <span style="font-weight: 500;">Edit Stakes</span>
        </a>
        <a href="#" class="sidebar-item" style="padding: 13px 20px; display: flex; align-items: center; color: #333; text-decoration: none; border-bottom: 1px solid #ddd; background: white;" onclick="handleSidebarNav(event, ['notification', 'notifications'])">
          <i class="fa fa-bell" style="width: 30px; font-size: 18px; color: #444;"></i>
          <span style="font-weight: 500;">Notifications</span>
        </a>
        <a href="#" class="sidebar-item" style="padding: 13px 20px; display: flex; align-items: center; color: #333; text-decoration: none; border-bottom: 1px solid #ddd; background: white;" onclick="handleSidebarNav(event, ['unapproved payment', 'gateway'])">
          <i class="fa fa-upload" style="width: 30px; font-size: 18px; color: #444;"></i>
          <span style="font-weight: 500;">Payment Gateway Unapproved Payment?</span>
        </a>
        <a href="#" class="sidebar-item" style="padding: 13px 20px; display: flex; align-items: center; color: #333; text-decoration: none; border-bottom: 1px solid #ddd; background: white;" onclick="handleSidebarNav(event, ['rules'])">
          <i class="fa fa-shield" style="width: 30px; font-size: 18px; color: #444;"></i>
          <span style="font-weight: 500;">Rules</span>
        </a>

        <div style="padding: 40px 0 30px; text-align: center; cursor: pointer; width: 100%;" onclick="logout()">
          <span style="font-size: 16px; color: #666; font-weight: 500;">Logout</span>
        </div>
      </div>
    `;

    document.body.appendChild(sidebar);

    // Update sidebar username when login state changes
    function updateSidebarUser() {
      const userBar = document.getElementById('sidebar-user-bar');
      if (userBar) {
        const username = localStorage.getItem('username') || '7788830926';
        const isLogged = localStorage.getItem('token');
        if (isLogged) {
          userBar.querySelector('span').textContent = username;
        }
      }
    }

    window.toggleSidebar = function () {
      sidebar.classList.toggle('open');
    };

    window.logout = function () {
      localStorage.removeItem('token');
      window.location.href = '/';
    };

    window.handleSidebarNav = function (e, keywords) {
      if (e) e.preventDefault();
      let clicked = false;
      const elements = document.querySelectorAll('a, button, [role="button"], span, div, ion-item, .item');

      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        if (el.closest('.sidebar')) continue;
        if (el.children.length === 0 || (el.children.length === 1 && el.children[0].tagName === 'I') || el.tagName === 'ION-ITEM') {
          const txt = el.textContent ? el.textContent.toLowerCase().trim() : '';
          if (keywords.some(k => txt === k || txt.includes(k))) {
            const clickable = el.closest('a, button, [role="button"], ion-item, .item') || el;
            clickable.click();
            clicked = true;
            break;
          }
        }
      }

      if (!clicked) {
        console.warn('Could not find native target for:', keywords);
        const fallbackRoute = '/' + keywords[0].replace(/\s+/g, '-');
        if (window.location.hash.includes('/')) window.location.hash = fallbackRoute;
        else window.location.href = fallbackRoute;
      }
      if (typeof window.toggleSidebar === 'function') window.toggleSidebar();
    };

    updateSidebarUser();
  }, []);

  return null; // No React-rendered JSX — the sidebar is injected into <body>
}
