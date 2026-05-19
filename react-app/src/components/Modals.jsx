import { useEffect } from 'react';

export default function Modals() {
  useEffect(() => {
    const LOGO = '/Screenshot_2026-05-10_020828-removebg-preview.png';

    // Bottom nav HTML reused across overlays
    function bottomNavHTML(overlayId) {
      return `
        <div style="position:fixed;bottom:0;left:0;width:100%;height:65px;background:#4a90e2;display:flex;align-items:center;justify-content:space-around;z-index:10001;padding-bottom:env(safe-area-inset-bottom,10px);box-sizing:content-box;">
          <div style="display:flex;flex-direction:column;align-items:center;color:white;font-size:10px;cursor:pointer;" onclick="document.getElementById('${overlayId}').remove()">
            <i class="fa fa-home" style="font-size:20px;margin-bottom:3px;"></i>Home
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;color:white;font-size:10px;cursor:pointer;" onclick="document.getElementById('${overlayId}').remove();showInplay();">
            <i class="fa fa-play" style="font-size:20px;margin-bottom:3px;"></i>Inplay
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;color:white;font-size:10px;">
            <i class="fa fa-eye" style="font-size:20px;margin-bottom:3px;"></i>My Markets
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;color:white;font-size:10px;">
            <i class="fa fa-users" style="font-size:20px;margin-bottom:3px;"></i>Referral
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;color:white;font-size:10px;">
            <i class="fa fa-book" style="font-size:20px;margin-bottom:3px;"></i>Passbook
          </div>
        </div>`;
    }

    function overlayHeader(overlayId) {
      return `
        <div style="background:#4a90e2;height:60px;width:100%;display:flex;align-items:center;padding:0 15px;box-sizing:border-box;">
          <i class="fa fa-arrow-left" style="color:white;font-size:20px;cursor:pointer;margin-right:15px;" onclick="document.getElementById('${overlayId}').remove()"></i>
          <img src="${LOGO}" style="height:28px;width:auto;margin-right:auto;">
          <div style="color:white;text-align:right;">
            <div style="font-size:11px;opacity:0.9;">0.08 Bal</div>
            <div style="font-size:11px;opacity:0.9;">0 Exp</div>
          </div>
          <button style="background:white;color:#4a90e2;border:none;border-radius:4px;padding:4px 10px;font-size:12px;font-weight:600;margin-left:10px;">Deposit</button>
        </div>`;
    }

    // ── showWithdrawalDetails ──
    window.showWithdrawalDetails = function (e) {
      if (e) e.preventDefault();
      if (typeof window.toggleSidebar === 'function') window.toggleSidebar();
      if (document.getElementById('custom-withdrawal-overlay')) return;

      const overlay = document.createElement('div');
      overlay.id = 'custom-withdrawal-overlay';
      overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#f5f5f5;z-index:10000;overflow-y:auto;padding-top:60px;padding-bottom:80px;';
      overlay.innerHTML = `
        <div style="position:fixed;top:0;left:0;width:100%;z-index:10001;">${overlayHeader('custom-withdrawal-overlay')}</div>
        <div style="display:flex;background:white;border-bottom:1px solid #eee;">
          <div style="flex:1;text-align:center;padding:15px 0;color:#333;font-weight:600;border-bottom:3px solid #333;font-size:13px;">ACTIVE BANKS</div>
          <div style="flex:1;text-align:center;padding:15px 0;color:#888;font-size:13px;">DELETED</div>
        </div>
        <div style="margin:20px 15px;background:white;border-radius:12px;padding:25px;display:flex;align-items:center;justify-content:center;gap:12px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <img src="https://flagcdn.com/w40/in.png" style="width:24px;border-radius:2px;">
          <span style="font-size:18px;color:#333;font-weight:500;">7788830926</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:0 30px;margin-bottom:25px;">
          <div style="color:#555;font-size:14px;cursor:pointer;">Add New Bank</div>
          <div style="color:#555;font-size:14px;cursor:pointer;">Add USDT Account</div>
        </div>
        <div style="padding:0 15px;">
          <div style="font-size:16px;font-weight:600;color:#333;text-align:center;margin-bottom:20px;">Bank Details</div>
          <div style="background:white;border-radius:12px;padding:12px 15px;display:flex;align-items:center;gap:12px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <div style="width:40px;height:40px;border-radius:50%;overflow:hidden;border:1px solid #eee;display:flex;align-items:center;justify-content:center;">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/State_Bank_of_India_logo.svg" style="width:70%;height:auto;">
            </div>
            <div style="flex:1;">
              <div style="font-size:14px;font-weight:500;color:#333;">Airtel Payments Bank</div>
              <div style="font-size:12px;color:#4a90e2;">Default</div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;">
              <div style="background:#f0f0f0;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;">
                <i class="fa fa-trash" style="color:#666;font-size:14px;"></i>
              </div>
              <i class="fa fa-chevron-down" style="color:#888;font-size:14px;"></i>
            </div>
          </div>
        </div>
        ${bottomNavHTML('custom-withdrawal-overlay')}
      `;
      document.body.appendChild(overlay);
    };

    // ── showAccountStatement ──
    window.showAccountStatement = function (e) {
      if (e) e.preventDefault();
      if (typeof window.toggleSidebar === 'function') window.toggleSidebar();
      if (document.getElementById('custom-account-overlay')) return;

      const overlay = document.createElement('div');
      overlay.id = 'custom-account-overlay';
      overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#f5f5f5;z-index:10000;overflow-y:auto;padding-top:140px;padding-bottom:80px;';
      overlay.innerHTML = `
        <div style="position:fixed;top:0;left:0;width:100%;z-index:10002;">
          ${overlayHeader('custom-account-overlay')}
          <div style="background:#4a90e2;padding:5px 10px;display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;">
            <i class="fa fa-search" style="color:white;font-size:20px;margin:5px;"></i>
            <div style="background:white;color:#4a90e2;border-radius:5px;padding:4px 12px;font-size:11px;white-space:nowrap;">Delhi Capitals v Chennai Super Kings</div>
            <div style="background:rgba(255,255,255,0.2);color:white;border-radius:5px;padding:4px 12px;font-size:11px;white-space:nowrap;">Indian Premier League</div>
          </div>
          <div style="background:white;padding:10px 0;display:flex;gap:15px;overflow-x:auto;scrollbar-width:none;border-bottom:1px solid #eee;justify-content:space-around;">
            <div style="text-align:center;min-width:60px;"><div style="width:36px;height:36px;background:#333;border-radius:50%;margin:0 auto 4px;display:flex;align-items:center;justify-content:center;"><i class="fa fa-rocket" style="color:white;font-size:18px;"></i></div><div style="font-size:9px;color:#555;">JetX</div></div>
            <div style="text-align:center;min-width:60px;"><div style="width:36px;height:36px;background:#444;border-radius:50%;margin:0 auto 4px;display:flex;align-items:center;justify-content:center;"><i class="fa fa-trophy" style="color:white;font-size:18px;"></i></div><div style="font-size:9px;color:#555;">Tournaments</div></div>
            <div style="text-align:center;min-width:60px;"><div style="width:36px;height:36px;background:#555;border-radius:50%;margin:0 auto 4px;display:flex;align-items:center;justify-content:center;"><i class="fa fa-soccer-ball-o" style="color:white;font-size:18px;"></i></div><div style="font-size:9px;color:#555;">Cricket</div></div>
          </div>
        </div>
        <div style="padding:15px;display:flex;flex-direction:column;gap:12px;">
          <div style="display:flex;gap:10px;">
            <div style="flex:1;"><div style="font-size:12px;color:#666;margin-bottom:5px;">From</div><div style="background:white;border:1px solid #ddd;border-radius:6px;padding:10px;display:flex;justify-content:space-between;align-items:center;"><span style="font-size:14px;color:#333;">07-05-2026</span><i class="fa fa-calendar" style="color:#666;"></i></div></div>
            <div style="flex:1;"><div style="font-size:12px;color:#666;margin-bottom:5px;">To</div><div style="background:white;border:1px solid #ddd;border-radius:6px;padding:10px;display:flex;justify-content:space-between;align-items:center;"><span style="font-size:14px;color:#333;">14-05-2026</span><i class="fa fa-calendar" style="color:#666;"></i></div></div>
          </div>
        </div>
        <div style="background:#e8e8e8;display:flex;padding:10px 0;border-top:1px solid #ddd;border-bottom:1px solid #ddd;">
          <div style="flex:1.2;text-align:center;font-size:12px;color:#444;font-weight:500;">Date</div>
          <div style="flex:1;text-align:center;font-size:12px;color:#444;font-weight:500;">Member Win</div>
          <div style="flex:1;text-align:center;font-size:12px;color:#444;font-weight:500;">Balance</div>
          <div style="flex:1;text-align:center;font-size:12px;color:#444;font-weight:500;">Remark</div>
        </div>
        <div style="height:200px;display:flex;align-items:center;justify-content:center;color:#999;font-size:14px;">No records found</div>
        ${bottomNavHTML('custom-account-overlay')}
      `;
      document.body.appendChild(overlay);
    };

    // ── showDepositWithdrawReport ──
    window.showDepositWithdrawReport = function (e) {
      if (e) e.preventDefault();
      if (typeof window.toggleSidebar === 'function') window.toggleSidebar();
      if (document.getElementById('custom-report-overlay')) return;

      const overlay = document.createElement('div');
      overlay.id = 'custom-report-overlay';
      overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#f5f5f5;z-index:10000;overflow-y:auto;padding-top:110px;padding-bottom:80px;';
      overlay.innerHTML = `
        <div style="position:fixed;top:0;left:0;width:100%;z-index:10002;">
          ${overlayHeader('custom-report-overlay')}
          <div style="background:white;display:flex;align-items:center;border-bottom:1px solid #eee;height:50px;">
            <div style="padding:0 10px;color:#ccc;"><i class="fa fa-chevron-left"></i></div>
            <div style="flex:1;display:flex;overflow-x:auto;scrollbar-width:none;justify-content:space-around;">
              <div style="padding:15px 10px;color:#333;font-weight:600;font-size:12px;border-bottom:3px solid #333;text-transform:uppercase;">TRANSACTION</div>
              <div style="padding:15px 10px;color:#aaa;font-size:12px;text-transform:uppercase;">CRICKET</div>
              <div style="padding:15px 10px;color:#aaa;font-size:12px;text-transform:uppercase;">TENNIS</div>
            </div>
            <div style="padding:0 10px;color:#333;"><i class="fa fa-chevron-right"></i></div>
          </div>
        </div>
        <div style="padding:15px;">
          <div style="display:flex;justify-content:center;gap:20px;margin-bottom:20px;padding:10px 0;">
            <div style="color:#333;font-weight:600;font-size:14px;padding:6px 20px;">Deposit</div>
            <div style="background:white;color:#333;font-weight:500;font-size:14px;border:1px solid #eee;border-radius:20px;padding:6px 40px;box-shadow:0 2px 5px rgba(0,0,0,0.05);">Withdraw</div>
          </div>
          <div style="font-size:14px;font-weight:600;color:#333;margin-bottom:10px;">Transactions</div>
          <div style="background:rgba(240,240,240,0.5);border-radius:8px;padding:10px;display:flex;gap:10px;margin-bottom:20px;">
            <i class="fa fa-info-circle" style="color:#ddd;font-size:16px;"></i>
            <div style="font-size:11px;color:#bbb;line-height:1.4;">यदि आपकी जमा राशि में कोई समस्या आती है, तो हमें बताने के लिए अपनी डिपॉजिट विवरण के पास दिए गए Report Issue बटन पर क्लिक करें</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:15px;">
            <div style="background:white;border-radius:12px;padding:15px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">
                <div><div style="font-size:14px;font-weight:600;color:#333;">Deposit</div><div style="font-size:11px;color:#999;margin-top:2px;">2025-07-17 16:57:52</div></div>
                <div style="text-align:right;"><div style="font-size:14px;font-weight:600;color:#333;">5000</div><div style="font-size:11px;color:#4caf50;font-weight:600;margin-top:2px;">APPROVED</div></div>
              </div>
            </div>
            <div style="background:white;border-radius:12px;padding:15px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">
                <div><div style="font-size:14px;font-weight:600;color:#333;">Deposit</div><div style="font-size:11px;color:#999;margin-top:2px;">2025-07-17 13:16:59</div></div>
                <div style="text-align:right;"><div style="font-size:14px;font-weight:600;color:#333;">5000</div><div style="font-size:11px;color:#4caf50;font-weight:600;margin-top:2px;">APPROVED</div></div>
              </div>
            </div>
          </div>
        </div>
        ${bottomNavHTML('custom-report-overlay')}
      `;
      document.body.appendChild(overlay);
    };

    // ── showDeposit ──
    window.showDeposit = function () {
      if (document.getElementById('deposit-modal-overlay')) return;
      const modal = document.createElement('div');
      modal.id = 'deposit-modal-overlay';
      modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:4000;display:flex;justify-content:center;align-items:flex-end;';
      modal.onclick = (ev) => { if (ev.target === modal) modal.remove(); };
      modal.innerHTML = `
        <style>@keyframes slideUpBottomSheet{from{transform:translateY(100%)}to{transform:translateY(0)}}</style>
        <div style="width:100%;background:white;border-radius:20px 20px 0 0;overflow:hidden;animation:slideUpBottomSheet 0.3s ease-out;padding-bottom:env(safe-area-inset-bottom,20px);">
          <div style="background:#1b222d;padding:18px 20px;display:flex;align-items:center;justify-content:center;position:relative;">
            <span style="color:white;font-size:16px;font-weight:500;">Deposit</span>
            <div id="deposit-close-x" style="position:absolute;right:14px;top:50%;transform:translateY(-50%);background:#4a90e2;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;cursor:pointer;">
              <i class="fa fa-times" style="color:white;font-size:13px;"></i>
            </div>
          </div>
          <div style="padding:20px 20px 0;">
            <div style="background:#f4f4f4;border-radius:12px;padding:18px;text-align:center;margin-bottom:20px;">
              <div style="font-size:13px;color:#888;margin-bottom:6px;">Available Balance</div>
              <div style="font-size:22px;font-weight:600;color:#222;">0.08</div>
            </div>
            <div style="font-size:14px;font-weight:600;color:#222;margin-bottom:10px;">Deposit Coins</div>
            <div style="background:#f0f0f0;border-radius:10px;padding:0 14px;margin-bottom:8px;">
              <input type="number" placeholder="Enter Coins" style="width:100%;box-sizing:border-box;padding:14px 0;border:none;background:transparent;font-size:14px;color:#333;outline:none;">
            </div>
            <div style="font-size:12px;color:#999;margin-bottom:20px;">Minimum deposit amount is 100 coins</div>
          </div>
          <div style="border-top:1px solid #eee;padding:16px;text-align:center;cursor:pointer;" onclick="alert('Payment gateway coming soon')">
            <span style="font-size:15px;color:#333;">Make Payment</span>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      modal.querySelector('#deposit-close-x').onclick = () => modal.remove();
    };

    // ── showMyMarkets ──
    window.showMyMarkets = function (e) {
      if (e) e.preventDefault();
      const modal = document.createElement('div');
      modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:4000;display:flex;justify-content:center;align-items:center;';
      modal.onclick = (ev) => { if (ev.target === modal) modal.remove(); };
      modal.innerHTML = `
        <div style="width:90%;max-width:500px;background:white;border-radius:15px;overflow:hidden;">
          <div class="custom-modal-header"><b>My Markets (Active Bets)</b><i class="fa fa-times-circle close-btn" onclick="this.closest('[style*=fixed]').remove()"></i></div>
          <div style="padding:60px 20px;text-align:center;color:#999;">No bets placed yet, Place your bet now!</div>
        </div>`;
      document.body.appendChild(modal);
    };

    // ── showReferral ──
    window.showReferral = function (e) {
      if (e) e.preventDefault();
      const modal = document.createElement('div');
      modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:4000;display:flex;justify-content:center;align-items:center;';
      modal.onclick = (ev) => { if (ev.target === modal) modal.remove(); };
      modal.innerHTML = `
        <div style="width:90%;max-width:400px;background:white;border-radius:15px;overflow:hidden;">
          <div class="custom-modal-header">
            <img src="${LOGO}" height="25">
            <i class="fa fa-times-circle close-btn" onclick="this.closest('[style*=fixed]').remove()"></i>
          </div>
          <div class="refer-modal-body">
            <h3 style="margin-top:0;">Refer and earn</h3>
            <p style="font-size:12px;color:#666;">Be our brand hero, refer your friend using your refer code</p>
            <div class="refer-input-group">
              <input type="text" value="https://1xbetreal.com/ref/1435369" readonly>
              <button onclick="alert('Copied!')">Copy</button>
            </div>
            <div class="social-share">
              <div class="social-item"><img src="https://cdn-icons-png.flaticon.com/512/733/733585.png"><span>WhatsApp</span></div>
              <div class="social-item"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png"><span>Telegram</span></div>
              <div class="social-item"><img src="https://cdn-icons-png.flaticon.com/512/1621/1621635.png"><span>Copy Text</span></div>
            </div>
          </div>
        </div>`;
      document.body.appendChild(modal);
    };

    // ── showRegisterModal ──
    window.showRegisterModal = function () {
      const backdrop = document.createElement('div');
      backdrop.id = 'register-backdrop';
      backdrop.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:2000000;display:flex;align-items:flex-end;justify-content:center;box-sizing:border-box;';
      backdrop.onclick = (e) => { if (e.target === backdrop) backdrop.remove(); };
      backdrop.innerHTML = `
        <style>@keyframes sheetUp{from{transform:translateY(100%)}to{transform:translateY(0)}}</style>
        <div style="background:#4a90e2;width:100%;max-width:500px;border-radius:24px 24px 0 0;padding:15px 20px 40px;position:relative;animation:sheetUp 0.3s ease-out;">
          <div style="width:40px;height:4px;background:rgba(255,255,255,0.3);border-radius:2px;margin:0 auto 20px;"></div>
          <div style="position:absolute;top:15px;right:20px;width:30px;height:30px;background:rgba(255,255,255,0.1);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;" onclick="document.getElementById('register-backdrop').remove()">
            <i class="fa fa-times" style="color:white;font-size:16px;"></i>
          </div>
          <div style="text-align:center;margin-bottom:30px;"><img src="${LOGO}" style="height:45px;width:auto;"></div>
          <div style="margin-bottom:25px;">
            <label style="display:block;color:white;font-size:14px;font-weight:500;margin-bottom:10px;margin-left:5px;">Mobile Number</label>
            <div style="display:flex;gap:10px;">
              <div style="background:white;border-radius:12px;width:70px;height:50px;display:flex;align-items:center;justify-content:center;color:#333;font-size:16px;font-weight:600;">+91</div>
              <input type="tel" placeholder="Enter Mobile number" style="flex:1;background:white;border:none;border-radius:12px;height:50px;padding:0 15px;font-size:16px;color:#333;outline:none;">
            </div>
          </div>
          <div style="text-align:center;">
            <a href="#" style="color:black;text-decoration:none;font-size:16px;" onclick="event.preventDefault();alert('OTP Sent!')">Get OTP On Message</a>
          </div>
        </div>`;
      document.body.appendChild(backdrop);
    };

    // ── showInplay ──
    window.showInplay = function (e) {
      if (e) e.preventDefault();
      let clicked = false;
      const elements = document.querySelectorAll('a,button,[role="button"],span,div');
      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        if (el.closest('.bottom-nav')) continue;
        if (el.children.length === 0 || (el.children.length === 1 && el.children[0].tagName === 'I')) {
          const txt = el.textContent ? el.textContent.toLowerCase().trim() : '';
          if (txt === 'in-play' || txt === 'inplay') {
            const clickable = el.closest('a,button,[role="button"],[class*="tab"],[class*="nav"]') || el;
            clickable.click();
            clicked = true;
            break;
          }
        }
      }
      if (!clicked) console.warn('Could not find native Inplay button.');
    };

  }, []);

  return null;
}
