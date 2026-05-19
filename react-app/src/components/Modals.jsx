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
          <div style="display:flex;flex-direction:column;align-items:center;color:white;font-size:10px;cursor:pointer;" onclick="if(document.getElementById('${overlayId}')) document.getElementById('${overlayId}').remove(); if(window.showPassbook) window.showPassbook();">
            <i class="fa fa-book" style="font-size:20px;margin-bottom:3px;"></i>Passbook
          </div>
        </div>`;
    }

    function overlayHeader(overlayId, showAnnouncement = false, showDocIcon = false) {
      return `
        <div style="background:#f5f5f5;height:24px;width:100%;display:flex;align-items:center;position:relative;justify-content:center;color:#333;font-size:13px;">
          <span>Welcome</span>
          <i class="fa fa-times" style="position:absolute;right:10px;cursor:pointer;" onclick="document.getElementById('${overlayId}').remove()"></i>
        </div>
        <div style="background:#4a90e2;height:60px;width:100%;display:flex;align-items:center;padding:0 15px;box-sizing:border-box;">
          <i class="fa fa-arrow-left" style="color:white;font-size:20px;cursor:pointer;margin-right:15px;" onclick="document.getElementById('${overlayId}').remove()"></i>
          <img src="${LOGO}" style="height:28px;width:auto;margin-right:auto;cursor:pointer;" onclick="window.location.href='/'">
          <div style="color:white;text-align:right;">
            <div style="font-size:11px;opacity:0.9;">0.08 Bal</div>
            <div style="font-size:11px;opacity:0.9;">0 Exp</div>
          </div>
          <button onclick="showDeposit()" style="background:white;color:#4a90e2;border:none;border-radius:4px;padding:4px 10px;font-size:12px;font-weight:600;margin-left:10px;cursor:pointer;">Deposit</button>
          ${showDocIcon ? `<div style="background:white;color:#4a90e2;border-radius:4px;padding:4px 8px;margin-left:8px;cursor:pointer;" onclick="showDepositWithdrawReport()"><i class="fa fa-file-text-o" style="font-size:14px;"></i></div>` : ''}
        </div>
        ${showAnnouncement ? `
        <div style="background:#4a90e2; padding:8px 15px; display:flex; gap:15px;">
          <i class="fa fa-search" style="color:#1b222d;font-size:18px;"></i>
          <i class="fa fa-bullhorn" style="color:#1b222d;font-size:18px;"></i>
        </div>` : ''}`;
    }

    window.showWithdrawalDetails = function (e) {
      if (e) e.preventDefault();
      if (typeof window.toggleSidebar === 'function') window.toggleSidebar();
      if (document.getElementById('custom-withdrawal-overlay')) return;

      const overlay = document.createElement('div');
      overlay.id = 'custom-withdrawal-overlay';
      overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#eaeaed;z-index:10000;overflow-y:auto;padding-top:120px;padding-bottom:80px;';
      overlay.innerHTML = `
        <div style="position:fixed;top:0;left:0;width:100%;z-index:10001;">${overlayHeader('custom-withdrawal-overlay', true)}</div>
        <div style="display:flex;background:#f0f2f5;border-bottom:1px solid #ddd;padding-top:15px;">
          <div style="flex:1;display:flex;justify-content:center;cursor:pointer;" onclick="document.getElementById('active-banks-container').style.display='block'; document.getElementById('deleted-banks-container').style.display='none'; document.getElementById('tab-active').style.borderBottom='2px solid #000'; document.getElementById('tab-active').style.color='#333'; document.getElementById('tab-deleted').style.borderBottom='none'; document.getElementById('tab-deleted').style.color='#666';">
            <div id="tab-active" style="padding-bottom:10px;font-size:12px;font-weight:600;color:#333;border-bottom:2px solid #000;padding-left:15px;padding-right:15px;">ACTIVE BANKS</div>
          </div>
          <div style="flex:1;display:flex;justify-content:center;cursor:pointer;" onclick="document.getElementById('active-banks-container').style.display='none'; document.getElementById('deleted-banks-container').style.display='block'; document.getElementById('tab-deleted').style.borderBottom='2px solid #000'; document.getElementById('tab-deleted').style.color='#333'; document.getElementById('tab-active').style.borderBottom='none'; document.getElementById('tab-active').style.color='#666';">
            <div id="tab-deleted" style="padding-bottom:10px;font-size:12px;font-weight:600;color:#666;padding-left:15px;padding-right:15px;">DELETED</div>
          </div>
        </div>
        <div id="active-banks-container">
          <div style="margin:20px 15px;background:white;border-radius:8px;padding:25px;display:flex;align-items:center;justify-content:center;gap:10px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            <img src="https://flagcdn.com/w40/in.png" style="width:20px;height:15px;border-radius:2px;">
            <span style="font-size:16px;color:#333;font-weight:500;">7788830926</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding:0 30px;margin-bottom:25px;">
            <div style="color:#333;font-size:13px;cursor:pointer;" onclick="showAddBankModal()">Add New Bank</div>
            <div style="color:#333;font-size:13px;cursor:pointer;" onclick="showAddUSDTModal()">Add USDT Account</div>
          </div>
          <div style="padding:0;">
            <div style="font-size:16px;font-weight:600;color:#333;text-align:center;margin-bottom:15px;">Bank Details</div>
            <div style="background:white;border-radius:8px;margin:0 15px;box-shadow:0 1px 3px rgba(0,0,0,0.1);overflow:hidden;">
              <div style="padding:12px 15px;display:flex;align-items:center;gap:12px;cursor:pointer;" onclick="const d=document.getElementById('bank-expanded-details'); d.style.display=d.style.display==='none'?'block':'none';">
                <div style="width:36px;height:36px;border-radius:50%;border:1px solid #eee;display:flex;align-items:center;justify-content:center;background:white;">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/State_Bank_of_India_logo.svg" style="width:60%;height:auto;">
                </div>
                <div style="flex:1;">
                  <div style="font-size:14px;color:#333;">Airtel Payments Bank</div>
                  <div style="font-size:12px;color:#4a90e2;margin-top:2px;">Default</div>
                </div>
                <div style="display:flex;align-items:center;gap:15px;">
                  <div style="background:#f5f5f5;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;" onclick="event.stopPropagation();showDeleteConfirmationModal()">
                    <i class="fa fa-trash" style="color:#333;font-size:14px;"></i>
                  </div>
                  <i class="fa fa-caret-down" style="color:#333;font-size:16px;"></i>
                </div>
              </div>
              <div id="bank-expanded-details" style="display:block;padding:15px;border-top:1px solid #f0f0f0;background:white;">
                <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:13px;">
                  <div style="color:#666;">Account holder name</div>
                  <div style="color:#333;font-weight:500;">Sagar</div>
                </div>
                <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:13px;">
                  <div style="color:#666;">Account number</div>
                  <div style="color:#333;font-weight:500;">7984341985</div>
                </div>
                <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:13px;">
                  <div style="color:#666;">IFSC Code</div>
                  <div style="color:#333;font-weight:500;">AIRP0000001</div>
                </div>
                <div style="display:flex;justify-content:space-between;font-size:13px;">
                  <div style="color:#666;">Account added on</div>
                  <div style="color:#333;font-weight:500;">2025-07-17 23:53:27</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="deleted-banks-container" style="display:none;padding:30px 15px;">
          <div style="background:white;border-radius:8px;padding:40px 20px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            <div style="width:50px;height:50px;background:#f5f5f5;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 15px;">
              <i class="fa fa-trash-o" style="font-size:24px;color:#ccc;"></i>
            </div>
            <div style="color:#999;font-size:14px;font-weight:500;">No deleted records found</div>
          </div>
        </div>
        ${bottomNavHTML('custom-withdrawal-overlay')}
      `;
      document.body.appendChild(overlay);
    };

    window.showAddBankModal = function() {
      if (document.getElementById('add-bank-modal')) return;
      const modal = document.createElement('div');
      modal.id = 'add-bank-modal';
      modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:20000;display:flex;align-items:center;justify-content:center;padding:15px;';
      modal.innerHTML = `
        <div style="width:100%;max-width:400px;background:white;border-radius:12px;overflow:hidden;position:relative;max-height:90vh;overflow-y:auto;font-family:sans-serif;">
          <div style="background:#1b222d;padding:15px;display:flex;align-items:center;justify-content:center;position:relative;">
            <span style="color:white;font-size:15px;font-weight:500;">Add new bank account</span>
            <div style="position:absolute;right:15px;width:26px;height:26px;background:#4a90e2;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;" onclick="document.getElementById('add-bank-modal').remove()">
              <i class="fa fa-times" style="color:white;font-size:14px;"></i>
            </div>
          </div>
          <div style="padding:20px 15px;">
            <div style="margin-bottom:15px;">
              <label style="display:block;font-size:13px;font-weight:600;color:#333;margin-bottom:6px;">Account holder name*</label>
              <input type="text" placeholder="Enter account holder name" style="width:100%;box-sizing:border-box;background:#f0f0f0;border:none;padding:12px 15px;border-radius:8px;font-size:14px;outline:none;">
            </div>
            <div style="margin-bottom:15px;">
              <label style="display:block;font-size:13px;font-weight:600;color:#333;margin-bottom:6px;">Account number*</label>
              <input type="text" placeholder="Enter Account Number" style="width:100%;box-sizing:border-box;background:#f0f0f0;border:none;padding:12px 15px;border-radius:8px;font-size:14px;outline:none;">
            </div>
            <div style="margin-bottom:15px;">
              <label style="display:block;font-size:13px;font-weight:600;color:#333;margin-bottom:6px;">Confirm Account number*</label>
              <input type="text" placeholder="Enter Account Number" style="width:100%;box-sizing:border-box;background:#f0f0f0;border:none;padding:12px 15px;border-radius:8px;font-size:14px;outline:none;">
            </div>
            <div style="margin-bottom:15px;">
              <label style="display:block;font-size:13px;font-weight:600;color:#333;margin-bottom:6px;">IFSC code*</label>
              <input type="text" placeholder="Enter bank IFSC" style="width:100%;box-sizing:border-box;background:#f0f0f0;border:none;padding:12px 15px;border-radius:8px;font-size:14px;outline:none;">
            </div>
            <div style="margin-bottom:15px;">
              <label style="display:block;font-size:13px;font-weight:600;color:#333;margin-bottom:6px;">Mobile*</label>
              <div style="position:relative;display:flex;align-items:center;">
                <input type="text" value="7788830926" readonly style="width:100%;box-sizing:border-box;background:#f0f0f0;border:none;padding:12px 15px;border-radius:8px;font-size:14px;outline:none;color:#333;">
                <div style="position:absolute;right:15px;display:flex;gap:5px;">
                  <span style="font-size:12px;color:#fff;font-weight:600;text-shadow:0 0 2px #ccc;">Get OTP Whatsapp</span>
                  <span style="font-size:12px;color:#fff;font-weight:600;text-shadow:0 0 2px #ccc;">Get OTP Whatsapp</span>
                </div>
              </div>
            </div>
            <div style="margin-bottom:25px;">
              <label style="display:block;font-size:13px;font-weight:600;color:#333;margin-bottom:6px;">OTP*</label>
              <input type="text" placeholder="Enter OTP" style="width:100%;box-sizing:border-box;background:#f0f0f0;border:none;padding:12px 15px;border-radius:8px;font-size:14px;outline:none;">
            </div>
      `;
      document.body.appendChild(modal);
    };

    window.showAddUSDTModal = function() {
      if (document.getElementById('add-usdt-modal')) return;
      const modal = document.createElement('div');
      modal.id = 'add-usdt-modal';
      modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:20000;display:flex;align-items:center;justify-content:center;padding:15px;';
      modal.innerHTML = `
        <div style="width:100%;max-width:400px;background:white;border-radius:12px;overflow:hidden;position:relative;max-height:90vh;overflow-y:auto;font-family:sans-serif;">
          <div style="background:#1b222d;padding:15px;display:flex;align-items:center;justify-content:center;position:relative;">
            <span style="color:white;font-size:15px;font-weight:500;">Add New USDT Account</span>
            <div style="position:absolute;right:15px;width:26px;height:26px;background:#4a90e2;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;" onclick="document.getElementById('add-usdt-modal').remove()">
              <i class="fa fa-times" style="color:white;font-size:14px;"></i>
            </div>
          </div>
          <div style="padding:20px 15px;">
            <div style="margin-bottom:15px;">
              <label style="display:block;font-size:13px;font-weight:600;color:#333;margin-bottom:6px;">USDT Type*</label>
              <div style="display:flex;gap:20px;font-size:14px;color:#333;">
                <label style="display:flex;align-items:center;gap:6px;cursor:pointer;"><input type="radio" name="usdttype" style="margin:0;cursor:pointer;" checked> BEP20</label>
                <label style="display:flex;align-items:center;gap:6px;cursor:pointer;"><input type="radio" name="usdttype" style="margin:0;cursor:pointer;"> TRC20</label>
              </div>
            </div>
            <div style="margin-bottom:15px;">
              <label style="display:block;font-size:13px;font-weight:600;color:#333;margin-bottom:6px;">Wallet Address*</label>
              <input type="text" placeholder="Enter Wallet Address" style="width:100%;box-sizing:border-box;background:#f0f0f0;border:none;padding:12px 15px;border-radius:8px;font-size:14px;outline:none;">
            </div>
            <div style="margin-bottom:15px;">
              <label style="display:block;font-size:13px;font-weight:600;color:#333;margin-bottom:6px;">Mobile*</label>
              <div style="position:relative;display:flex;align-items:center;">
                <input type="text" value="7788830926" readonly style="width:100%;box-sizing:border-box;background:#f0f0f0;border:none;padding:12px 15px;border-radius:8px;font-size:14px;outline:none;color:#333;">
                <div style="position:absolute;right:15px;display:flex;gap:5px;">
                  <span style="font-size:12px;color:#fff;font-weight:600;text-shadow:0 0 2px #ccc;">Get OTP Whatsapp</span>
                  <span style="font-size:12px;color:#fff;font-weight:600;text-shadow:0 0 2px #ccc;">Get OTP Whatsapp</span>
                </div>
              </div>
            </div>
            <div style="margin-bottom:25px;">
              <label style="display:block;font-size:13px;font-weight:600;color:#333;margin-bottom:6px;">OTP*</label>
              <input type="text" placeholder="Enter OTP" style="width:100%;box-sizing:border-box;background:#f0f0f0;border:none;padding:12px 15px;border-radius:8px;font-size:14px;outline:none;">
            </div>
            <button style="width:100%;background:#c0c0c0;color:#333;border:none;padding:14px 0;border-radius:8px;font-size:14px;font-weight:500;cursor:not-allowed;">Submit</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    };

    window.showDeleteConfirmationModal = function() {
      if (document.getElementById('delete-conf-modal')) return;
      const modal = document.createElement('div');
      modal.id = 'delete-conf-modal';
      modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.4);z-index:30000;display:flex;align-items:center;justify-content:center;padding:15px;';
      modal.innerHTML = `
        <div style="width:100%;max-width:320px;background:white;border-radius:12px;padding:20px;font-family:sans-serif;box-shadow:0 4px 12px rgba(0,0,0,0.15);">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;">
            <div style="background:#ffa000;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;">
              <i class="fa fa-exclamation" style="color:white;font-size:14px;font-weight:bold;"></i>
            </div>
            <span style="font-size:16px;font-weight:600;color:#000;">Delete</span>
          </div>
          <div style="font-size:14px;color:#555;margin-bottom:25px;">
            Are you sure you want to delete this?
          </div>
          <div style="display:flex;gap:10px;">
            <button style="flex:1;background:white;color:#333;border:1px solid #ddd;padding:10px 0;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;" onclick="document.getElementById('delete-conf-modal').remove()">Cancel</button>
            <button style="flex:1;background:#4a90e2;color:white;border:none;padding:10px 0;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;" onclick="document.getElementById('delete-conf-modal').remove();alert('Bank account deleted!')">Yes, Delete</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    };


    // ── showAccountStatement ──
    window.showAccountStatement = function (e) {
      if (e) e.preventDefault();
      if (typeof window.toggleSidebar === 'function') window.toggleSidebar();
      if (document.getElementById('custom-account-overlay')) return;

      const overlay = document.createElement('div');
      overlay.id = 'custom-account-overlay';
      overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#f5f5f5;z-index:10000;overflow-y:auto;padding-top:215px;padding-bottom:80px;';
      overlay.innerHTML = `
        <div style="position:fixed;top:0;left:0;width:100%;z-index:10002;">
          ${overlayHeader('custom-account-overlay')}
          <div style="background:#4a90e2;padding:5px 10px;display:flex;align-items:center;gap:8px;overflow-x:auto;scrollbar-width:none;">
            <i class="fa fa-search" style="color:#333;font-size:18px;margin:0 5px;"></i>
            <div style="background:white;color:#4a90e2;border-radius:4px;padding:6px 12px;font-size:12px;white-space:nowrap;font-weight:500;">Rajasthan Royals v Lucknow Super Giants</div>
            <div style="background:white;color:#4a90e2;border-radius:4px;padding:6px 12px;font-size:12px;white-space:nowrap;font-weight:500;">Kolkata Knight Rider...</div>
          </div>
          <div style="background:white;padding:15px 10px 10px;display:flex;gap:15px;overflow-x:auto;scrollbar-width:none;border-bottom:1px solid #ddd;">
            <div style="text-align:center;min-width:60px;">
              <div style="width:40px;height:40px;background:#333;border-radius:50%;margin:0 auto 6px;display:flex;align-items:center;justify-content:center;position:relative;">
                <i class="fa fa-rocket" style="color:white;font-size:18px;"></i>
              </div>
              <div style="font-size:10px;color:#555;">JetX</div>
            </div>
            <div style="text-align:center;min-width:60px;">
              <div style="width:40px;height:40px;background:#333;border-radius:50%;margin:0 auto 6px;display:flex;align-items:center;justify-content:center;position:relative;">
                <i class="fa fa-trophy" style="color:white;font-size:18px;"></i>
              </div>
              <div style="font-size:10px;color:#555;">Tournaments</div>
            </div>
            <div style="text-align:center;min-width:60px;">
              <div style="width:40px;height:40px;background:#333;border-radius:50%;margin:0 auto 6px;display:flex;align-items:center;justify-content:center;position:relative;">
                <i class="fa fa-soccer-ball-o" style="color:white;font-size:18px;"></i>
                <div style="position:absolute;top:-5px;right:-5px;background:white;color:#333;font-size:9px;font-weight:bold;width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:1px solid #ccc;">4</div>
              </div>
              <div style="font-size:10px;color:#555;">Cricket</div>
            </div>
            <div style="text-align:center;min-width:60px;">
              <div style="width:40px;height:40px;background:#333;border-radius:50%;margin:0 auto 6px;display:flex;align-items:center;justify-content:center;position:relative;">
                <i class="fa fa-futbol-o" style="color:white;font-size:18px;"></i>
                <div style="position:absolute;top:-5px;right:-5px;background:white;color:#333;font-size:9px;font-weight:bold;width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:1px solid #ccc;">5</div>
              </div>
              <div style="font-size:10px;color:#555;">Soccer</div>
            </div>
            <div style="text-align:center;min-width:60px;">
              <div style="width:40px;height:40px;background:#333;border-radius:50%;margin:0 auto 6px;display:flex;align-items:center;justify-content:center;position:relative;">
                <i class="fa fa-circle" style="color:white;font-size:18px;"></i>
                <div style="position:absolute;top:-5px;right:-5px;background:white;color:#333;font-size:9px;font-weight:bold;width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:1px solid #ccc;">2</div>
              </div>
              <div style="font-size:10px;color:#555;">Tennis</div>
            </div>
            <div style="text-align:center;min-width:60px;">
              <div style="width:40px;height:40px;background:#333;border-radius:50%;margin:0 auto 6px;display:flex;align-items:center;justify-content:center;position:relative;">
                <i class="fa fa-plane" style="color:white;font-size:18px;"></i>
              </div>
              <div style="font-size:10px;color:#555;">Go Cras...</div>
            </div>
          </div>
        </div>
        <div style="padding:15px;display:flex;flex-direction:column;gap:12px;">
          <div style="display:flex;gap:10px;">
            <div style="flex:1;">
              <div style="font-size:12px;color:#666;margin-bottom:5px;font-weight:500;">From</div>
              <div style="position:relative;background:white;border:none;border-radius:6px;padding:12px 14px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <input type="date" value="2026-05-12" style="position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;cursor:pointer;" onchange="this.nextElementSibling.innerText=this.value.split('-').reverse().join('/')">
                <span style="font-size:14px;color:#333;pointer-events:none;">12/05/2026</span>
                <i class="fa fa-chevron-down" style="color:#666;font-size:10px;pointer-events:none;"></i>
              </div>
            </div>
            <div style="flex:1;">
              <div style="font-size:12px;color:#666;margin-bottom:5px;font-weight:500;">To</div>
              <div style="position:relative;background:white;border:none;border-radius:6px;padding:12px 14px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <input type="date" value="2026-05-19" style="position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;cursor:pointer;" onchange="this.nextElementSibling.innerText=this.value.split('-').reverse().join('/')">
                <span style="font-size:14px;color:#333;pointer-events:none;">19/05/2026</span>
                <i class="fa fa-chevron-down" style="color:#666;font-size:10px;pointer-events:none;"></i>
              </div>
            </div>
          </div>
          <div style="display:flex;gap:10px;align-items:center;">
            <div style="flex:1;background:white;border-radius:6px;padding:12px 14px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
              <span style="font-size:14px;color:#333;">All</span>
              <i class="fa fa-caret-down" style="color:#666;font-size:12px;"></i>
            </div>
            <div style="flex:1;display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;">
              <span style="position:relative;display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;">
                <i class="fa fa-filter" style="color:#555;font-size:16px;"></i>
                <div style="position:absolute;top:-2px;left:-2px;width:120%;height:120%;background:linear-gradient(to top right, transparent 46%, #555 46%, #555 54%, transparent 54%);"></div>
              </span>
              <span style="color:#555;font-size:13px;">Clear filter</span>
            </div>
          </div>
        </div>
        <div style="background:#e8e8e8;border-radius:6px;display:flex;padding:12px 5px;margin:0 15px;">
          <div style="flex:1.2;text-align:center;font-size:12px;color:#333;font-weight:600;">Date</div>
          <div style="flex:1;text-align:center;font-size:12px;color:#666;font-weight:600;">Member Win</div>
          <div style="flex:1;text-align:center;font-size:12px;color:#666;font-weight:600;">Balance</div>
          <div style="flex:1;text-align:center;font-size:12px;color:#666;font-weight:600;">Remark</div>
        </div>
        <div style="height:50vh;display:flex;align-items:center;justify-content:center;color:#999;font-size:14px;">No records found</div>
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
      overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#f5f5f5;z-index:10000;overflow-y:auto;padding-top:135px;padding-bottom:80px;';
      overlay.innerHTML = `
        <div style="position:fixed;top:0;left:0;width:100%;z-index:10002;">
          ${overlayHeader('custom-report-overlay', false, true)}
          <div style="background:#e0e0e0;display:flex;align-items:center;height:45px;">
            <div style="padding:0 15px;color:#aaa;"><i class="fa fa-chevron-left"></i></div>
            <div style="flex:1;display:flex;overflow-x:auto;scrollbar-width:none;justify-content:space-between;align-items:center;height:100%;">
              <div style="height:100%;display:flex;align-items:center;padding:0 15px;color:white;font-weight:600;font-size:11px;border-bottom:2px solid white;text-transform:uppercase;">TRANSACTION</div>
              <div style="height:100%;display:flex;align-items:center;padding:0 15px;color:#aaa;font-size:11px;text-transform:uppercase;border-bottom:2px solid transparent;">CRICKET</div>
              <div style="height:100%;display:flex;align-items:center;padding:0 15px;color:#aaa;font-size:11px;text-transform:uppercase;border-bottom:2px solid transparent;">TENNIS</div>
            </div>
            <div style="padding:0 15px;color:#333;"><i class="fa fa-chevron-right"></i></div>
          </div>
        </div>
        <div style="padding:15px;">
          <div style="display:flex;justify-content:center;gap:0;margin-bottom:20px;padding:10px 0;">
            <div style="color:#888;font-weight:500;font-size:13px;padding:8px 35px;cursor:pointer;">Deposit</div>
            <div style="background:white;color:#333;font-weight:500;font-size:13px;border-radius:20px;padding:8px 35px;box-shadow:0 1px 3px rgba(0,0,0,0.05);cursor:pointer;">Withdraw</div>
          </div>
          <div style="font-size:13px;font-weight:600;color:#333;margin-bottom:10px;">Transactions</div>
          <div style="background:white;border-radius:6px;padding:12px;display:flex;gap:12px;margin-bottom:15px;box-shadow:0 1px 2px rgba(0,0,0,0.05);">
            <div style="background:#ff9800;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;">
              <i class="fa fa-info" style="color:white;font-size:10px;font-weight:bold;"></i>
            </div>
            <div style="font-size:11px;color:#555;line-height:1.5;">
              यदि आपकी जमा राशि में कोई समस्या आती है, तो हमें बताने के लिए अपनी डिपॉज़िट विवरण के पास दिए गए Report Issue बटन पर क्लिक करें
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:15px;">
            <div style="background:white;border-radius:8px;padding:15px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                <div>
                  <div style="font-size:14px;color:#222;margin-bottom:4px;">Deposit</div>
                  <div style="font-size:13px;color:#777;">2025-07-17 16:57:52</div>
                </div>
                <div style="text-align:right;">
                  <div style="font-size:14px;color:#222;margin-bottom:4px;">5000</div>
                  <div style="font-size:13px;color:#2e8b57;">APPROVED</div>
                </div>
              </div>
              <div style="margin-top:10px;">
                <i class="fa fa-caret-down" style="color:#333;font-size:16px;cursor:pointer;margin-left:5px;" onclick="const d=this.parentElement.nextElementSibling; if(d.style.display==='none'){d.style.display='block';this.className='fa fa-caret-down';}else{d.style.display='none';this.className='fa fa-caret-right';}"></i>
              </div>
              <div style="display:block;background:#e5e5e5;border-radius:10px;padding:15px;margin-top:15px;">
                <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                  <div style="font-size:13px;color:#333;">Coins</div>
                  <div style="font-size:13px;color:#222;">5000</div>
                </div>
                <div style="display:flex;justify-content:space-between;padding-bottom:12px;border-bottom:1px solid #d0d0d0;">
                  <div style="font-size:13px;color:#333;">Modified on</div>
                  <div style="font-size:13px;color:#222;">2025-07-17 16:57:52</div>
                </div>
                <div style="display:flex;flex-direction:column;gap:5px;margin-top:12px;">
                  <img src="invalid_path.jpg" alt="" style="width:20px;height:20px;">
                  <div style="font-size:16px;color:#222;">Screer</div>
                </div>
              </div>
            </div>
            <div style="background:white;border-radius:8px;padding:15px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                <div>
                  <div style="font-size:14px;color:#222;margin-bottom:4px;">Deposit</div>
                  <div style="font-size:13px;color:#777;">2025-07-17 13:16:59</div>
                </div>
                <div style="text-align:right;">
                  <div style="font-size:14px;color:#222;margin-bottom:4px;">5000</div>
                  <div style="font-size:13px;color:#2e8b57;">APPROVED</div>
                </div>
              </div>
              <div style="margin-top:10px;">
                <i class="fa fa-caret-right" style="color:#333;font-size:16px;cursor:pointer;margin-left:5px;" onclick="const d=this.parentElement.nextElementSibling; if(d.style.display==='none'){d.style.display='block';this.className='fa fa-caret-down';}else{d.style.display='none';this.className='fa fa-caret-right';}"></i>
              </div>
              <div style="display:none;background:#e5e5e5;border-radius:10px;padding:15px;margin-top:15px;">
                <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                  <div style="font-size:13px;color:#333;">Coins</div>
                  <div style="font-size:13px;color:#222;">5000</div>
                </div>
                <div style="display:flex;justify-content:space-between;padding-bottom:12px;border-bottom:1px solid #d0d0d0;">
                  <div style="font-size:13px;color:#333;">Modified on</div>
                  <div style="font-size:13px;color:#222;">2025-07-17 13:16:59</div>
                </div>
                <div style="display:flex;flex-direction:column;gap:5px;margin-top:12px;">
                  <img src="invalid_path.jpg" alt="" style="width:20px;height:20px;">
                  <div style="font-size:16px;color:#222;">Screer</div>
                </div>
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

    // ── showPassbook ──
    window.showPassbook = function (e) {
      if (e) e.preventDefault();
      if (typeof window.toggleSidebar === 'function') window.toggleSidebar();
      if (document.getElementById('custom-passbook-overlay')) return;

      const overlay = document.createElement('div');
      overlay.id = 'custom-passbook-overlay';
      overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#f5f5f5;z-index:9000;overflow-y:auto;padding-top:125px;padding-bottom:80px;';
      overlay.innerHTML = `
        <div style="position:fixed;top:0;left:0;width:100%;z-index:10001;">
          ${overlayHeader('custom-passbook-overlay', true)}
        </div>
        <div style="padding:15px;display:flex;flex-direction:column;gap:8px;">
          
          <div style="background:white;border-radius:6px;padding:15px;margin-bottom:8px;border:1px solid #eaeaea;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
              <div style="display:flex;align-items:center;gap:10px;">
                <img src="https://flagcdn.com/w40/in.png" style="width:24px;height:18px;border-radius:2px;">
                <span style="font-size:15px;color:#333;">7788830926</span>
              </div>
              <div style="background:#f0f0f0;color:#333;font-size:12px;padding:8px 12px;border-radius:4px;cursor:pointer;">
                Change Password
              </div>
            </div>
            <div style="background:#f5f5f5;border-radius:6px;padding:15px;">
              <div style="font-size:14px;color:#555;margin-bottom:5px;">Balance</div>
              <div style="font-size:22px;font-weight:bold;color:#111;margin-bottom:15px;">0.08</div>
              <div style="display:flex;gap:10px;">
                <button style="flex:1;background:#4a90e2;color:white;border:none;border-radius:4px;padding:12px 0;font-size:14px;font-weight:500;cursor:pointer;" onclick="showDeposit()">Deposit</button>
                <button style="flex:1;background:#4a90e2;color:white;border:none;border-radius:4px;padding:12px 0;font-size:14px;font-weight:500;cursor:pointer;" onclick="showDepositWithdrawReport()">Withdraw</button>
              </div>
            </div>
          </div>

          <div style="background:white;border-radius:6px;padding:15px;display:flex;align-items:center;gap:15px;border:1px solid #eaeaea;cursor:pointer;" onclick="showMyMarkets()">
            <i class="fa fa-flag" style="color:#555;font-size:18px;width:20px;text-align:center;"></i>
            <span style="font-size:14px;color:#222;font-weight:500;">Active Bets</span>
          </div>
          <div style="background:white;border-radius:6px;padding:15px;display:flex;align-items:center;gap:15px;border:1px solid #eaeaea;cursor:pointer;" onclick="showAccountStatement()">
            <i class="fa fa-address-card-o" style="color:#555;font-size:18px;width:20px;text-align:center;"></i>
            <span style="font-size:14px;color:#222;font-weight:500;">Account Statement</span>
          </div>
          <div style="background:white;border-radius:6px;padding:15px;display:flex;align-items:center;gap:15px;border:1px solid #eaeaea;cursor:pointer;" onclick="showDepositWithdrawReport()">
            <i class="fa fa-address-book-o" style="color:#555;font-size:18px;width:20px;text-align:center;"></i>
            <span style="font-size:14px;color:#222;font-weight:500;">Deposit/Withdraw Report</span>
          </div>
          <div style="background:white;border-radius:6px;padding:15px;display:flex;align-items:center;gap:15px;border:1px solid #eaeaea;cursor:pointer;">
            <i class="fa fa-shield" style="color:#555;font-size:18px;width:20px;text-align:center;"></i>
            <span style="font-size:14px;color:#222;font-weight:500;">Rules</span>
          </div>
          <div style="background:white;border-radius:6px;padding:15px;display:flex;align-items:center;gap:15px;border:1px solid #eaeaea;cursor:pointer;" onclick="showWithdrawalDetails()">
            <i class="fa fa-university" style="color:#555;font-size:18px;width:20px;text-align:center;"></i>
            <span style="font-size:14px;color:#222;font-weight:500;">Banking</span>
          </div>

          <div style="text-align:center;margin-top:30px;margin-bottom:20px;">
            <span style="color:#333;font-size:14px;cursor:pointer;" onclick="alert('Logging out...');localStorage.removeItem('token');location.reload();">Logout</span>
          </div>

        </div>
        ${bottomNavHTML('custom-passbook-overlay')}
      `;
      document.body.appendChild(overlay);
    };

  }, []);

  return null;
}
