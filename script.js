        const setVh = () => {
          let vh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        window.addEventListener('resize', setVh);
        setVh();
      })();
    </script>
    <script>
      // UI Transformation Script
      document.addEventListener('DOMContentLoaded', function() {
        // Create Sidebar element
        const sidebar = document.createElement('div');
        sidebar.className = 'sidebar';
        sidebar.id = 'customSidebar';
        sidebar.innerHTML = `
          <div class="sidebar-header" style="background-color: #4a90e2 !important; padding: 0 15px; display: flex; align-items: center; justify-content: flex-start; height: 100px !important; box-sizing: border-box; position: relative;">
            <a href="https://1xbetreal.com/" style="text-decoration: none; display: flex; align-items: center;">
              <img src="Screenshot_2026-05-10_020828-removebg-preview.png" style="height: 50px !important; width: auto; object-fit: contain; margin-left: 0;">
            </a>
            <div style="background: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: absolute; top: 15px; right: 15px;" onclick="toggleSidebar()">
              <i class="fa fa-chevron-left" style="color: #4a90e2; font-size: 14px; margin-right: 2px;"></i>
            </div>
          </div>
          <div class="sidebar-user" style="padding: 12px 20px; background-color: #ccc; display: flex; align-items: center; border-bottom: 1px solid #bbb;">
            <i class="fa fa-user" style="font-size:20px; margin-right:15px; color: #000;"></i>
            <span style="font-weight: bold; color: #000; font-size: 15px;">Guest User</span>
          </div>
          <div class="sidebar-menu" style="background-color: #eee; flex: 1;">
            <a href="#" class="sidebar-item" style="padding: 12px 20px; display: flex; align-items: center; color: #333; text-decoration: none; border-bottom: 1px solid #ddd;">
              <i class="fa fa-user" style="width: 30px; font-size: 18px; color: #444;"></i>
              <span style="font-weight: 500;">Profile</span>
            </a>
            <a href="#" class="sidebar-item" style="padding: 12px 20px; display: flex; align-items: center; color: #333; text-decoration: none; border-bottom: 1px solid #ddd;" onclick="showWithdrawalDetails(event)">
              <i class="fa fa-university" style="width: 30px; font-size: 18px; color: #444;"></i>
              <span style="font-weight: 500;">Withdrawal Details</span>
            </a>
            <a href="#" class="sidebar-item" style="padding: 12px 20px; display: flex; align-items: center; color: #333; text-decoration: none; border-bottom: 1px solid #ddd;">
              <i class="fa fa-file-text" style="width: 30px; font-size: 18px; color: #444;"></i>
              <span style="font-weight: 500;">Account Statement</span>
            </a>
            <a href="#" class="sidebar-item" style="padding: 12px 20px; display: flex; align-items: center; color: #333; text-decoration: none; border-bottom: 1px solid #ddd;">
              <i class="fa fa-file-image-o" style="width: 30px; font-size: 18px; color: #444;"></i>
              <span style="font-weight: 500;">Deposit/Withdraw Report</span>
            </a>
            <a href="#" class="sidebar-item" style="padding: 12px 20px; display: flex; align-items: center; color: #333; text-decoration: none; border-bottom: 1px solid #ddd;">
              <i class="fa fa-flag" style="width: 30px; font-size: 18px; color: #444;"></i>
              <span style="font-weight: 500;">Active Bets</span>
            </a>
            <a href="#" class="sidebar-item" style="padding: 12px 20px; display: flex; align-items: center; color: #333; text-decoration: none; border-bottom: 1px solid #ddd;">
              <i class="fa fa-bell" style="width: 30px; font-size: 18px; color: #444;"></i>
              <span style="font-weight: 500;">Notifications</span>
            </a>
            <a href="#" class="sidebar-item" style="padding: 12px 20px; display: flex; align-items: center; color: #333; text-decoration: none; border-bottom: 1px solid #ddd;">
              <i class="fa fa-shield" style="width: 30px; font-size: 18px; color: #444;"></i>
              <span style="font-weight: 500;">Rules</span>
            </a>
            <div style="padding: 40px 20px 20px; text-align: center; cursor: pointer;" onclick="logout()">
              <span style="font-size: 15px; color: #444;">Logout</span>
            </div>
          </div>
        `;
        document.body.appendChild(sidebar);

        window.toggleSidebar = function() {
          sidebar.classList.toggle('open');
        };

        window.logout = function() {
          localStorage.removeItem('token');
          window.location.href = '/';
        };

        function updateUI() {
          const isLogged = localStorage.getItem('token');
          const body = document.body;

          // ── 1. STYLE rfm-marquee (Welcome banner) white background ──
          document.querySelectorAll('.rfm-marquee, .rfm-marquee-container').forEach(el => {
            el.style.backgroundColor = '#ffffff';
            el.style.color = '#333';
          });

          // ── 2. HEADER background ──
          const headers = document.querySelectorAll('.header-dark, header, .page-header, .header-wrapper, .top-header, ion-header, ion-toolbar, .main-header');
          headers.forEach(header => {
            header.style.backgroundColor = '#4a90e2';
            header.style.padding = '5px 10px';

            if (!isLogged) {
              // Target Style for Login/Register Buttons
              if (!header.querySelector('.auth-btns')) {
                const authBtns = document.createElement('div');
                authBtns.className = 'auth-btns';
                authBtns.style.cssText = 'display: flex; gap: 8px; position: absolute; right: 10px; top: 50%; transform: translateY(-50%);';
                authBtns.innerHTML = `
                  <button onclick="document.querySelector('.login-btn, .login').click()" style="background: white; color: #4a90e2; border: 1px solid white; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: bold; cursor: pointer;">Log in</button>
                  <button onclick="document.querySelector('.register-btn, .register').click()" style="background: white; color: #4a90e2; border: 1px solid white; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: bold; cursor: pointer;">Register</button>
                `;
                header.style.position = 'relative';
                header.appendChild(authBtns);
                
                // Hide original buttons
                header.querySelectorAll('ion-button, .login-btn, .register-btn, .demo-btn').forEach(btn => {
                  if (btn.parentElement !== authBtns) btn.style.display = 'none';
                });
              }
            }
            
            // Fix Logo
            let logo = header.querySelector('img');
            if (logo && !logo.src.includes('Screenshot')) {
              logo.src = 'Screenshot_2026-05-10_020828-removebg-preview.png';
              logo.style.height = '22px';
              logo.style.width = 'auto';
              logo.style.marginLeft = '40px'; // Space for hamburger
              if (logo.parentElement.tagName !== 'A') {
                const link = document.createElement('a');
                link.href = 'https://1xbetreal.com/';
                link.style.cssText = 'text-decoration:none; display:flex; align-items:center;';
                logo.parentNode.insertBefore(link, logo);
                link.appendChild(logo);
              }
            }

            // Inject Hamburger
            if (!header.querySelector('.fa-bars')) {
              const bars = document.createElement('i');
              bars.className = 'fa fa-bars';
              bars.style.cssText = 'position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: white; font-size: 20px; cursor: pointer;';
              bars.onclick = toggleSidebar;
              header.prepend(bars);
            }
            
            // Logged in UI
            if (isLogged) {
              body.classList.add('logged-in');
              if (!header.querySelector('.after-login-header')) {
                const afterLogin = document.createElement('div');
                afterLogin.className = 'after-login-header';
                afterLogin.style.cssText = 'display:flex; justify-content:space-between; align-items:center; width:100%; padding:5px 15px; background:#4a90e2;';
                afterLogin.innerHTML = `
                  <div style="display:flex; align-items:center;">
                    <i class="fa fa-bars" style="margin-right:15px; font-size:20px; cursor:pointer; color:white;" onclick="toggleSidebar()"></i>
                    <img src="Screenshot_2026-05-10_020828-removebg-preview.png" height="20">
                  </div>
                  <div style="display:flex; align-items:center;">
                    <div style="margin-right:10px; color:white; text-align:right; font-size:10px;">
                      <div>0.08 <span style="opacity:0.8">Bal</span></div>
                      <div>0 <span style="opacity:0.8">Exp</span></div>
                    </div>
                    <button onclick="showDeposit()" style="background:white; color:#4a90e2; border:none; padding:4px 12px; border-radius:4px; font-weight:bold; font-size:12px; cursor:pointer;">Deposit</button>
                  </div>
                `;
                Array.from(header.children).forEach(child => { if (child !== afterLogin) child.style.display = 'none'; });
                header.appendChild(afterLogin);
              }
            }
          });


          // If logged in, ensure we remove the injected register button
          if (isLogged) {
            document.querySelectorAll('.register-btn').forEach(el => el.remove());
          }

          // 3. SIDEBAR FIX - Target any sidebar and force styles
          const allSidebars = document.querySelectorAll('.sidebar, ion-menu, .drawer, #customSidebar');
          allSidebars.forEach(s => {
            const sHeader = s.querySelector('.sidebar-header, .logo, ion-header, .header');
            if (sHeader) {
              sHeader.style.cssText = 'background-color: #4a90e2 !important; padding: 0 15px; display: flex !important; align-items: center !important; justify-content: flex-start !important; height: 100px !important; box-sizing: border-box; position: relative !important;';
              
              let sLogo = sHeader.querySelector('img');
              if (!sLogo) {
                sLogo = document.createElement('img');
                sHeader.prepend(sLogo);
              }
              sLogo.src = 'Screenshot_2026-05-10_020828-removebg-preview.png';
              sLogo.style.cssText = 'height: 50px !important; width: auto; object-fit: contain; margin-left: 0;';

              // Wrap in link if not already
              if (sLogo.parentElement.tagName !== 'A') {
                const link = document.createElement('a');
                link.href = 'https://1xbetreal.com/';
                link.style.textDecoration = 'none';
                link.style.display = 'flex';
                link.style.alignItems = 'center';
                sLogo.parentNode.insertBefore(link, sLogo);
                link.appendChild(sLogo);
              }

              let sClose = sHeader.querySelector('.close-btn, .fa-chevron-left, [onclick*="toggleSidebar"]');
              if (sClose && sClose.parentElement !== sHeader) {
                 // Try to position it at top right
                 sClose.parentElement.style.position = 'absolute';
                 sClose.parentElement.style.top = '15px';
                 sClose.parentElement.style.right = '15px';
              }
            }
          });

          // 3. BOTTOM NAV
          if (isLogged && !document.querySelector('.bottom-nav')) {
            const nav = document.createElement('div');
            nav.className = 'bottom-nav';
            nav.innerHTML = `
              <a href="#" class="bottom-nav-item" onclick="location.reload()"><i class="fa fa-home"></i>Home</a>
              <a href="#" class="bottom-nav-item" onclick="showInplay(event)"><i class="fa fa-play-circle"></i>Inplay</a>
              <a href="#" class="bottom-nav-item" onclick="showMyMarkets(event)"><i class="fa fa-eye"></i>My Markets</a>
              <a href="#" class="bottom-nav-item" onclick="showReferral(event)"><i class="fa fa-users"></i>Referral</a>
              <a href="#" class="bottom-nav-item" onclick="showPassbook(event)"><i class="fa fa-book"></i>Passbook</a>
            `;
            document.body.appendChild(nav);
          }

            // Icons row is now injected via unified-header-wrapper for better layout control
          }

          // ── Wrap header + icons + latest-events into one single div ──
          if (!document.getElementById('unified-header-wrapper')) {
            const hdr = document.querySelector('.header-wrapper.top-header');
            const le  = document.querySelector('.latest-events.ng-star-inserted') || document.querySelector('.latest-events');
            if (hdr && le && hdr.parentNode) {
              const wrapper = document.createElement('div');
              wrapper.id = 'unified-header-wrapper';
              wrapper.style.display = 'flex';
              wrapper.style.flexDirection = 'column';
              hdr.parentNode.insertBefore(wrapper, hdr);
              
              // 1. Welcome Bar (Target Screenshot Style)
              const welcomeBar = document.createElement('div');
              welcomeBar.className = 'custom-welcome-bar';
              welcomeBar.style.cssText = 'background: white; color: #333; font-size: 14px; padding: 10px 15px; display: flex; justify-content: center; align-items: center; border-bottom: 1px solid #ddd; position: relative;';
              welcomeBar.innerHTML = '<span>Welcome</span><i class="fa fa-times" style="position: absolute; right: 15px; cursor: pointer; color: #333;" onclick="this.parentElement.style.display=\'none\'"></i>';
              
              // Hide existing welcome bars
              document.querySelectorAll('.welcome-bar, .demoid-marquee, rfm-marquee, .rfm-marquee-container').forEach(el => el.style.display = 'none');

              wrapper.appendChild(welcomeBar);
              wrapper.appendChild(hdr); // 2. Top Header (Logo & Login/Reg)
              
              // 3. Search & Match Chips Row
              const chipsRow = document.createElement('div');
              chipsRow.style.cssText = 'display: flex; align-items: center; background: white; padding: 10px 15px; border-bottom: 1px solid #eee; overflow: hidden;';
              chipsRow.innerHTML = `
                <i class="fa fa-search" style="color: #4a90e2; font-size: 18px; margin-right: 15px;"></i>
                <div style="display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none;">
                  <style>.chip { background: #f2f9ff; color: #4a90e2; padding: 6px 15px; border-radius: 4px; white-space: nowrap; font-size: 12px; font-weight: 500; border: 1px solid #d4e8f8; }</style>
                  <div class="chip">Delhi Capitals v Chennai Super Kings</div>
                  <div class="chip">Indian Premier League</div>
                  <div class="chip">Arsenal v Atletico Madrid</div>
                </div>
              `;
              wrapper.appendChild(chipsRow);
              
              // 4. Icons Row below Match Chips
              const iconsRow = document.createElement('div');
              iconsRow.id = 'custom-icons-row';
              iconsRow.style.cssText = 'display: flex; gap: 15px; overflow-x: auto; padding: 10px 15px; background: white; border-bottom: 1px solid #eee; scrollbar-width: none; -ms-overflow-style: none;';
              iconsRow.innerHTML = `
                <style>
                  #custom-icons-row::-webkit-scrollbar { display: none; }
                  .icon-item { display: flex; flex-direction: column; align-items: center; min-width: 55px; gap: 4px; }
                  .icon-circle { width: 38px; height: 38px; border-radius: 50%; background: #333; display: flex; align-items: center; justify-content: center; position: relative; }
                  .icon-circle i { color: #ffffff; font-size: 16px; }
                  .icon-label { font-size: 10px; color: #333; font-weight: 500; text-align: center; white-space: nowrap; }
                  .badge { position: absolute; top: -3px; right: -3px; background: #333; color: white; border: 1px solid white; border-radius: 50%; width: 14px; height: 14px; font-size: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; }
                </style>
                <div class="icon-item"><div class="icon-circle"><i class="fa fa-bolt"></i></div><div class="icon-label">JetX</div></div>
                <div class="icon-item"><div class="icon-circle"><i class="fa fa-trophy"></i></div><div class="icon-label">Tournaments</div></div>
                <div class="icon-item"><div class="icon-circle"><i class="fa fa-baseball-ball"></i><div class="badge">1</div></div><div class="icon-label">Cricket</div></div>
                <div class="icon-item"><div class="icon-circle"><i class="fa fa-soccer-ball-o"></i><div class="badge">5</div></div><div class="icon-label">Soccer</div></div>
                <div class="icon-item"><div class="icon-circle"><i class="fa fa-dot-circle-o"></i><div class="badge">4</div></div><div class="icon-label">Tennis</div></div>
                <div class="icon-item"><div class="icon-circle"><i class="fa fa-paper-plane"></i></div><div class="icon-label">Go Crash</div></div>
              `;
              wrapper.appendChild(iconsRow);
              
              // Hide redundant elements
              if (le) le.style.display = 'none';
            }
          }
        } // End of updateUI

        // Rest of the functions (showInplay, showMyMarkets, etc.) remain same...
        window.showInplay = function(e) {
          if(e) e.preventDefault();
          const main = document.querySelector('main') || document.querySelector('.main-content') || document.body.firstElementChild;
          main.innerHTML = `
            <div style="background:#f5f5f5; padding-bottom:60px;">
              <div style="padding:10px; background:white; display:flex; align-items:center; border-bottom:1px solid #ddd;">
                <i class="fa fa-arrow-left" style="margin-right:15px;" onclick="location.reload()"></i>
                <img src="Screenshot_2026-05-10_020828-removebg-preview.png" height="20">
              </div>
              <div style="padding:10px; font-weight:bold; color:#666;">Cricket <span style="float:right;">All ></span></div>
              <div style="background:white; padding:10px; margin-bottom:1px; display:flex; justify-content:space-between; font-size:12px; color:#999;">
                <div><i class="fa fa-clock-o"></i> Teams</div>
                <div style="display:flex; gap:40px;"><span style="width:40px; text-align:center;">Back</span><span style="width:40px; text-align:center;">Lay</span></div>
              </div>
              ${[1,2,3,4,5,6].map(() => `
                <div style="background:white; padding:15px; margin-bottom:1px; display:flex; justify-content:space-between; align-items:center;">
                  <div style="display:flex; align-items:center;">
                    <span style="background:green; color:white; font-size:8px; padding:2px 5px; border-radius:3px; margin-right:10px;">In-play</span>
                    <div style="font-size:13px; font-weight:bold;">Team A<br>Team B</div>
                  </div>
                  <div style="display:flex; gap:10px;">
                    <div style="background:#a5d8ff; width:60px; height:45px; display:flex; flex-direction:column; align-items:center; justify-content:center; border-radius:5px;">
                      <div style="font-weight:bold;">1.8</div><div style="font-size:10px;">3853.9</div>
                    </div>
                    <div style="background:#ffc9c9; width:60px; height:45px; display:flex; flex-direction:column; align-items:center; justify-content:center; border-radius:5px;">
                      <div style="font-weight:bold;">1.81</div><div style="font-size:10px;">120.93</div>
                    </div>
                  </div>
                </div>
              `).join('')}
              <div style="padding:10px; font-weight:bold; color:#666; margin-top:10px;">Football <span style="float:right;">All ></span></div>
              ${[1,2].map(() => `
                <div style="background:white; padding:15px; margin-bottom:1px; display:flex; justify-content:space-between; align-items:center;">
                  <div style="display:flex; align-items:center;">
                    <span style="background:green; color:white; font-size:8px; padding:2px 5px; border-radius:3px; margin-right:10px;">In-play</span>
                    <div style="font-size:13px; font-weight:bold;">Team C<br>Team D</div>
                  </div>
                  <div style="display:flex; gap:10px;">
                    <div style="background:#a5d8ff; width:60px; height:45px; display:flex; flex-direction:column; align-items:center; justify-content:center; border-radius:5px;">
                      <div style="font-weight:bold;">5.8</div><div style="font-size:10px;">84.68</div>
                    </div>
                    <div style="background:#ffc9c9; width:60px; height:45px; display:flex; flex-direction:column; align-items:center; justify-content:center; border-radius:5px;">
                      <div style="font-weight:bold;">6.6</div><div style="font-size:10px;">122.88</div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          `;
        };

        window.showMyMarkets = function(e) {
          if(e) e.preventDefault();
          const modal = document.createElement('div');
          modal.style.position = 'fixed';
          modal.style.top = '0';
          modal.style.left = '0';
          modal.style.width = '100%';
          modal.style.height = '100%';
          modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
          modal.style.zIndex = '4000';
          modal.style.display = 'flex';
          modal.style.justifyContent = 'center';
          modal.style.alignItems = 'center';
          modal.onclick = (e) => { if(e.target === modal) modal.remove(); };
          
          modal.innerHTML = `
            <div style="width:90%; max-width:500px; background:white; border-radius:15px; overflow:hidden;">
              <div class="custom-modal-header">
                <b>My Markets (Active Bets)</b>
                <i class="fa fa-times-circle close-btn" onclick="this.parentElement.parentElement.parentElement.remove()"></i>
              </div>
              <div style="padding:60px 20px; text-align:center; color:#999;">
                No bets placed yet, Place your bet now!
              </div>
            </div>
          `;
          document.body.appendChild(modal);
        };

        window.showReferral = function(e) {
          if(e) e.preventDefault();
          const modal = document.createElement('div');
          modal.style.position = 'fixed';
          modal.style.top = '0';
          modal.style.left = '0';
          modal.style.width = '100%';
          modal.style.height = '100%';
          modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
          modal.style.zIndex = '4000';
          modal.style.display = 'flex';
          modal.style.justifyContent = 'center';
          modal.style.alignItems = 'center';
          modal.onclick = (e) => { if(e.target === modal) modal.remove(); };
          
          modal.innerHTML = `
            <div style="width:90%; max-width:400px; background:white; border-radius:15px; overflow:hidden;">
              <div class="custom-modal-header">
                <img src="Screenshot_2026-05-10_020828-removebg-preview.png" height="25">
                <i class="fa fa-times-circle close-btn" onclick="this.parentElement.parentElement.parentElement.remove()"></i>
              </div>
              <div class="refer-modal-body">
                <h3 style="margin-top:0;">Refer and earn</h3>
                <p style="font-size:12px; color:#666;">Be our brand hero, refer your friend using your refer code</p>
                <div class="refer-input-group">
                  <input type="text" value="https://1xbetreal.com/ref/1435369" readonly>
                  <button onclick="alert('Copied!')">Copy</button>
                </div>
                <div class="social-share">
                  <div class="social-item">
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png">
                    <span>WhatsApp</span>
                  </div>
                  <div class="social-item">
                    <img src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png">
                    <span>Telegram</span>
                  </div>
                  <div class="social-item">
                    <img src="https://cdn-icons-png.flaticon.com/512/1621/1621635.png">
                    <span>Copy Text</span>
                  </div>
                </div>
              </div>
            </div>
          `;
          document.body.appendChild(modal);
        };

        window.showPassbook = function(e) {
          if(e) e.preventDefault();
          const main = document.querySelector('main') || document.querySelector('.main-content') || document.body.firstElementChild;
          main.innerHTML = `
            <div class="passbook-page">
              <div style="padding:10px; background:#4a90e2; display:flex; align-items:center; justify-content:space-between; color:white;">
                <div style="display:flex; align-items:center;">
                  <i class="fa fa-arrow-left" style="margin-right:15px; font-size:20px;" onclick="location.reload()"></i>
                  <img src="Screenshot_2026-05-10_020828-removebg-preview.png" height="25">
                </div>
                <div style="display:flex; align-items:center;">
                   <div style="font-size:10px; text-align:right; margin-right:10px;">
                    <div>0.08 <span style="opacity:0.8">Bal</span></div>
                    <div>0 <span style="opacity:0.8">Exp</span></div>
                   </div>
                   <button style="background:white; color:#4a90e2; border:none; padding:3px 15px; border-radius:20px; font-weight:bold; font-size:12px;">Deposit</button>
                </div>
              </div>
              <div class="transaction-tabs" style="display:flex; justify-content:space-between; align-items:center; padding:0 10px;">
                <i class="fa fa-chevron-left" style="color:#ccc;"></i>
                <div class="transaction-tab active">TRANSACTION</div>
                <div class="transaction-tab">CRICKET</div>
                <div class="transaction-tab">TENNIS</div>
                <i class="fa fa-chevron-right" style="color:#ccc;"></i>
              </div>
              <div style="display:flex; padding:15px; background:white; margin-bottom:10px;">
                <div style="flex:1; text-align:center; color:#666; padding-bottom:5px;">Deposit</div>
                <div style="flex:1; text-align:center; color:#333; border-bottom:3px solid #eee; padding-bottom:5px; background:#f5f5f5; border-radius:20px;">Withdraw</div>
              </div>
              <div style="padding:10px;">
                <div style="background:white; border:1px solid #ddd; padding:10px; border-radius:5px; font-size:12px; margin-bottom:15px; display:flex; align-items:center;">
                  <i class="fa fa-info-circle" style="margin-right:10px; font-size:18px; color:orange;"></i>
                  If you face any issue with your deposit, click the "Report Issue" button next to your deposit details to let us know.
                </div>
                
                <div class="transaction-card">
                  <div>
                    <div class="type">Deposit</div>
                    <div class="date">2025-07-17 16:57:52</div>
                    <i class="fa fa-caret-right" style="margin-top:5px;"></i>
                  </div>
                  <div style="text-align:right;">
                    <div class="amount">5000</div>
                    <div class="status">APPROVED</div>
                  </div>
                </div>
                
                <div class="transaction-card">
                  <div>
                    <div class="type">Deposit</div>
                    <div class="date">2025-07-17 13:16:59</div>
                    <i class="fa fa-caret-right" style="margin-top:5px;"></i>
                  </div>
                  <div style="text-align:right;">
                    <div class="amount">5000</div>
                    <div class="status">APPROVED</div>
                  </div>
                </div>
              </div>
            </div>
          `;
        };

        window.showDeposit = function() {
          const modal = document.createElement('div');
          modal.style.position = 'fixed';
          modal.style.top = '0';
          modal.style.left = '0';
          modal.style.width = '100%';
          modal.style.height = '100%';
          modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
          modal.style.zIndex = '4000';
          modal.style.display = 'flex';
          modal.style.justifyContent = 'center';
          modal.style.alignItems = 'center';
          modal.onclick = (e) => { if(e.target === modal) modal.remove(); };
          
          modal.innerHTML = `
            <div class="deposit-modal" style="width:90%; max-width:400px; background:white; border-radius:10px; overflow:hidden;">
              <div style="background:#1b222d; color:white; padding:15px; display:flex; justify-content:space-between; align-items:center;">
                <div style="flex:1; text-align:center; font-weight:500;">Deposit</div>
                <div style="background:#4a90e2; border-radius:50%; width:24px; height:24px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="this.parentElement.parentElement.parentElement.remove()">
                  <i class="fa fa-times" style="font-size:14px;"></i>
                </div>
              </div>
              <div style="padding:20px;">
                <div style="background:#f5f5f5; border-radius:8px; padding:15px; text-align:center; margin-bottom:20px;">
                  <div style="font-size:12px; color:#555; margin-bottom:5px;">Available Balance</div>
                  <div style="font-size:18px; color:#333;">0.08</div>
                </div>
                <div style="font-size:14px; color:#333; margin-bottom:8px; font-weight:500;">Deposit Coins</div>
                <input type="number" placeholder="Enter Coins" style="width:100%; box-sizing:border-box; padding:12px; border-radius:8px; border:none; background:#f5f5f5; margin-bottom:10px; font-size:14px; color:#333; outline:none;">
                <div style="font-size:11px; color:#666; margin-bottom:30px;">Minimum deposit amount is 100 coins</div>
              </div>
              <div style="text-align:center; padding:15px; border-top:1px solid #eee;">
                <button class="make-payment-btn" style="background:transparent; color:#333; border:none; font-size:14px; cursor:pointer;">Make Payment</button>
              </div>
            </div>
          `;
          document.body.appendChild(modal);
        };

        window.showWithdrawalDetails = function(e) {
          if(e) e.preventDefault();
          const main = document.querySelector('main') || document.querySelector('.main-content') || document.body.firstElementChild;
          main.innerHTML = `
            <div class="withdrawal-page" style="background:#f5f5f5; min-height:100vh; padding-bottom:60px;">
              <div style="padding:10px 15px; background:#4a90e2; display:flex; align-items:center; justify-content:space-between; color:white;">
                <div style="display:flex; align-items:center;">
                  <i class="fa fa-arrow-left" style="margin-right:15px; font-size:20px; cursor:pointer;" onclick="location.reload()"></i>
                  <img src="Screenshot_2026-05-10_020828-removebg-preview.png" height="24">
                </div>
                <div style="display:flex; align-items:center;">
                   <div style="font-size:10px; text-align:right; margin-right:10px;">
                    <div>0.08 <span style="opacity:0.8">Bal</span></div>
                    <div>0 <span style="opacity:0.8">Exp</span></div>
                   </div>
                   <button style="background:white; color:#4a90e2; border:none; padding:4px 12px; border-radius:4px; font-weight:bold; font-size:12px; cursor:pointer;" onclick="showDeposit()">Deposit</button>
                </div>
              </div>
              <div style="background:#f5f5f5; height:100px;"></div>
              <div style="background:#4a90e2; padding:10px 15px; display:flex; gap:15px;">
                <i class="fa fa-search" style="color:white; font-size:18px;"></i>
                <i class="fa fa-bullhorn" style="color:white; font-size:18px;"></i>
              </div>
              <div style="display:flex; background:#f5f5f5; padding:0 15px; border-bottom:1px solid #ddd;">
                <div style="flex:1; text-align:center; padding:15px 0; font-size:12px; border-bottom:2px solid #333; color:#333; font-weight:bold;">ACTIVE BANKS</div>
                <div style="flex:1; text-align:center; padding:15px 0; font-size:12px; color:#666; font-weight:bold;">DELETED</div>
              </div>
              <div style="padding:20px 15px;">
                <div style="background:white; border-radius:8px; padding:15px; text-align:center; font-size:16px; box-shadow:0 1px 3px rgba(0,0,0,0.1); margin-bottom:30px; display:flex; align-items:center; justify-content:center; gap:10px;">
                  <img src="https://flagcdn.com/w40/in.png" height="15" alt="India"> 7788830926
                </div>
                <div style="display:flex; justify-content:space-around; margin-bottom:30px;">
                  <div style="color:#555; font-size:13px; cursor:pointer;">Add New Bank</div>
                  <div style="color:#555; font-size:13px; cursor:pointer;">Add USDT Account</div>
                </div>
                <div style="text-align:center; font-weight:bold; color:#555; font-size:16px; margin-bottom:20px;">
                  Bank Details
                </div>
                <div style="background:white; border-radius:4px; padding:15px; display:flex; align-items:center; justify-content:space-between; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                  <div style="display:flex; align-items:center; gap:15px;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/2048px-SBI-logo.svg.png" style="height:35px; width:35px; object-fit:contain; border-radius:50%; border:1px solid #eee; padding:2px;">
                    <div>
                      <div style="font-size:14px; color:#333;">Airtel Payments Bank</div>
                      <div style="font-size:12px; color:#4a90e2; margin-top:2px;">Default</div>
                    </div>
                  </div>
                  <div style="display:flex; align-items:center; gap:15px;">
                    <div style="background:#f0f0f0; width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer;">
                      <i class="fa fa-trash" style="color:#555;"></i>
                    </div>
                    <i class="fa fa-caret-down" style="color:#333; cursor:pointer; font-size:18px;"></i>
                  </div>
                </div>
              </div>
            </div>
          `;
          
          const sidebar = document.getElementById('customSidebar');
          if (sidebar) sidebar.classList.remove('open');
        };

        // ── PERSISTENT REGISTRATION BUTTON INJECTION ──
        // This handles Angular constantly destroying and re-rendering the header
        (function setupPersistentAuth() {
            function injectRegister() {
                const isLogged = localStorage.getItem('token');

                // Fix Header & Sidebar Logos persistently (handles Angular re-renders)
                const headers = document.querySelectorAll('.header-dark, header, .page-header, .header-wrapper, .top-header, ion-header, ion-toolbar, .main-header, .sidebar-header, .left-sidemenu, .sidebar');
                headers.forEach(header => {
                    const logo = header.querySelector('img');
                    if (logo && !logo.src.includes('Screenshot')) {
                        logo.src = 'Screenshot_2026-05-10_020828-removebg-preview.png';
                        logo.style.height = '28px';
                        logo.style.width = 'auto';
                    }
                });

                if (isLogged) return; // Register button logic below handled for logged-out only

                const rightCont = document.querySelector('.header-right-cont');
                if (!rightCont) return;
                
                const notLoggedIn = rightCont.querySelector('.not-loggedIn');
                if (!notLoggedIn) return;
                
                // Only inject if it doesn't already exist
                if (!notLoggedIn.querySelector('.register-btn')) {
                    const btn = document.createElement('button');
                    btn.className = 'register-btn';
                    btn.innerText = 'Register';
                    btn.onclick = () => alert('Register Clicked');
                    // Insert perfectly beside the Login button
                    notLoggedIn.insertBefore(btn, notLoggedIn.firstChild);
                }
            }

            window.handleMockLogin = function(btn) {
                if (btn) {
                    btn.innerText = 'Logging in...';
                    btn.style.pointerEvents = 'none';
                    btn.style.opacity = '0.7';
                }
                
                // Immediately set the authentication token
                localStorage.setItem('token', 'mock_token_123');
                
                // Instantly force a page reload to transition to the after-login dashboard state
                // This completely bypasses any native Angular API delays or error toasts
                window.location.reload(true);
            };

            // Initial UI update and persistent observer
            setInterval(updateUI, 1000);
            updateUI();
            
            const observer = new MutationObserver(() => {
                injectRegister();
                updateUI();
            });
            observer.observe(document.body, { childList: true, subtree: true });
            injectRegister();
        });
    </script>
    <style>
      /* Hide native error toasts globally to prevent "Login Failed" flashes */
      ion-toast, snack-bar-container, .mat-mdc-snack-bar-container, .toast-container, .toast-message, .error-toast {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
      
      /* Force welcome bar white background */
      #custom-welcome-bar {
        background-color: #ffffff !important;
        border-bottom: 1px solid #ddd !important;
      }

      /* Login / Register button pair */
      .floating-auth-container {
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
      }
      .custom-header-btn.login-btn {
        background-color: white !important;
        color: #4a90e2 !important;
        border: 1px solid white !important;
        border-radius: 4px !important;
        padding: 4px 10px !important;
        font-size: 12px !important;
        font-weight: 600 !important;
        cursor: pointer !important;
        white-space: nowrap !important;
      }
      .custom-header-btn.register-btn {
        background-color: transparent !important;
        color: white !important;
        border: 1px solid white !important;
        border-radius: 4px !important;
        padding: 4px 10px !important;
        font-size: 12px !important;
        font-weight: 600 !important;
        cursor: pointer !important;
        white-space: nowrap !important;
      }

      /* Welcome Bar Offset Logic */
      body.with-welcome-bar .header-wrapper.top-header,
      body.with-welcome-bar .header-dark,
      body.with-welcome-bar header,
      body.with-welcome-bar .page-header {
        top: 26px !important;
        position: fixed !important;
        width: 100% !important;
      }
      body.with-welcome-bar #unified-header-wrapper {
        position: fixed !important;
        top: 26px !important;
        width: 100% !important;
        z-index: 999999 !important;
      }
      body.with-welcome-bar #root {
        padding-top: 100px !important;