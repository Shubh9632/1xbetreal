import { useEffect } from 'react';

// UIOverlay component
// Runs the updateUI() interval and setupPersistentAuth() MutationObserver.
// Exactly mirrors the original index.html inline script behaviour.
export default function UIOverlay() {
  useEffect(() => {
    const LOGO = '/Screenshot_2026-05-10_020828-removebg-preview.png';

    function updateUI() {
      const isLogged = localStorage.getItem('token');
      const body = document.body;

      // 1. Welcome banner white bg
      document.querySelectorAll('.rfm-marquee,.rfm-marquee-container').forEach(el => {
        el.style.backgroundColor = '#ffffff';
        el.style.color = '#333';
      });

      // 2. Header
      const headers = document.querySelectorAll(
        '.header-dark,header,.page-header,.header-wrapper,.top-header,ion-header,ion-toolbar,.main-header'
      );
      headers.forEach(header => {
        header.style.backgroundColor = '#4a90e2';

        // Fix logo
        let logo = header.querySelector('img');
        if (logo && !logo.src.includes('Screenshot')) {
          logo.src = LOGO;
          logo.style.height = '28px';
          logo.style.width = 'auto';
          if (logo.parentElement.tagName !== 'A') {
            const link = document.createElement('a');
            link.href = '/';
            link.style.cssText = 'text-decoration:none;display:flex;align-items:center;';
            logo.parentNode.insertBefore(link, logo);
            link.appendChild(logo);
          }
        }

        if (isLogged) {
          body.classList.add('logged-in');

          // Suppress native modals
          document.querySelectorAll('ion-modal,ion-backdrop,.ion-overlay-wrapper').forEach(m => {
            try { if (m.dismiss) m.dismiss(); } catch (_) {}
            m.style.cssText = 'display:none !important;opacity:0 !important;pointer-events:none !important;';
          });

          // Inject hamburger
          const logoWrap = header.querySelector('.logo,.header-logo,[class*="logo"]');
          if (logoWrap && logoWrap.parentNode) {
            const backBtn = header.querySelector('ion-back-button,.back-button');
            const isSubPage = backBtn && window.getComputedStyle(backBtn).display !== 'none' && backBtn.offsetParent !== null;
            let ham = header.querySelector('.custom-hamburger');

            if (isSubPage) {
              if (ham) ham.style.display = 'none';
              logoWrap.style.setProperty('margin-left', '40px', 'important');
              logoWrap.style.setProperty('margin-right', 'auto', 'important');
              // Hide search on subpages
              document.querySelectorAll('.search-items-container,.latest-events,.rfm-marquee-container,.rfm-marquee').forEach(el => {
                el.style.setProperty('display', 'none', 'important');
              });
            } else {
              if (!ham) {
                ham = document.createElement('i');
                ham.className = 'fa fa-bars custom-hamburger';
                ham.style.cssText = 'margin-right:12px;font-size:24px;cursor:pointer;color:white;display:flex;align-items:center;justify-content:center;';
                ham.onclick = (ev) => { ev.preventDefault(); ev.stopPropagation(); window.toggleSidebar && window.toggleSidebar(); };
                logoWrap.parentNode.insertBefore(ham, logoWrap);
              }
              ham.style.display = 'flex';
              logoWrap.style.setProperty('margin-left', '0', 'important');
              logoWrap.style.setProperty('margin-right', 'auto', 'important');
              document.querySelectorAll('.search-items-container,.latest-events,.rfm-marquee-container,.rfm-marquee').forEach(el => {
                el.style.removeProperty('display');
              });
            }
            logoWrap.style.display = 'flex';
            logoWrap.style.alignItems = 'center';
            logoWrap.style.setProperty('flex-grow', '0', 'important');
          }

          // Hide native mat-menu icons
          header.querySelectorAll('.mat-icon').forEach(icon => {
            if (icon.textContent && (icon.textContent.includes('menu') || icon.textContent.includes('dehaze'))) {
              icon.style.setProperty('display', 'none', 'important');
              if (icon.parentElement && icon.parentElement.tagName === 'BUTTON') {
                icon.parentElement.style.setProperty('display', 'none', 'important');
              }
            }
          });

          // Balance + Deposit in header right
          const rightCont = header.querySelector('.header-right-cont');
          if (rightCont) {
            const notLogged = rightCont.querySelector('.not-loggedIn');
            if (notLogged) notLogged.style.display = 'none';
            if (!rightCont.querySelector('.custom-logged-right')) {
              const lr = document.createElement('div');
              lr.className = 'custom-logged-right';
              lr.style.cssText = 'display:flex;align-items:center;gap:8px;';
              lr.innerHTML = `
                <div style="color:white;text-align:right;font-size:12px;line-height:1.4;">
                  <div>0.08 <span style="opacity:0.75">Bal</span></div>
                  <div>0 <span style="opacity:0.75">Exp</span></div>
                </div>
                <button onclick="showDeposit()" style="background:white;color:#4a90e2;border:none;padding:5px 14px;border-radius:20px;font-weight:bold;font-size:13px;cursor:pointer;white-space:nowrap;">Deposit</button>
              `;
              rightCont.appendChild(lr);
            }
          }
        } else {
          body.classList.remove('logged-in');
          document.querySelectorAll('.not-loggedIn').forEach(el => el.style.display = '');
          document.querySelectorAll('.custom-logged-right').forEach(el => el.remove());
          document.querySelectorAll('.custom-hamburger').forEach(el => el.remove());
        }
      });

      if (isLogged) {
        document.querySelectorAll('.register-btn').forEach(el => el.remove());
      }

      // 3. Framework sidebar header fix
      document.querySelectorAll('ion-menu,.drawer,.left-sidemenu').forEach(s => {
        let sHeader = s.querySelector('.custom-sidebar-header');
        if (!sHeader) {
          const nativeHeader = s.querySelector('.sidebar-header,.logo,ion-header,.header');
          if (nativeHeader) nativeHeader.style.setProperty('display', 'none', 'important');
          sHeader = document.createElement('div');
          sHeader.className = 'custom-sidebar-header';
          s.prepend(sHeader);
        }
        sHeader.innerHTML = `
          <div style="background:#4a90e2;height:85px;width:100%;display:flex;align-items:center;padding:0 15px;position:relative;box-sizing:border-box;">
            <img src="${LOGO}" style="height:32px;width:auto;margin-top:5px;">
            <div style="position:absolute;right:15px;top:50%;transform:translateY(-50%);width:34px;height:34px;background:white;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;margin-top:5px;" onclick="window.toggleSidebar&&window.toggleSidebar()">
              <i class="fa fa-chevron-left" style="color:#4a90e2;font-size:14px;margin-right:1px;"></i>
            </div>
          </div>
          <div style="background:#d8d8d8;height:50px;width:100%;display:flex;align-items:center;padding:0 20px;box-sizing:border-box;border-bottom:1px solid #bbb;">
            <i class="fa fa-user" style="font-size:24px;color:#000;margin-right:15px;"></i>
            <span style="font-size:18px;font-weight:600;color:#000;">Demo</span>
          </div>`;
        if (!s.querySelector('.custom-logout-bottom')) {
          const logoutDiv = document.createElement('div');
          logoutDiv.className = 'custom-logout-bottom';
          logoutDiv.style.cssText = 'padding:40px 0 30px;text-align:center;cursor:pointer;width:100%;border-top:1px solid rgba(0,0,0,0.05);';
          logoutDiv.onclick = (ev) => { ev.preventDefault(); ev.stopPropagation(); window.logout && window.logout(); };
          logoutDiv.innerHTML = '<span style="font-size:16px;color:#666;font-weight:500;">Logout</span>';
          const container = s.querySelector('ion-content,ion-list,.menu-items,.sidebar-menu,.drawer-content') || s;
          container.appendChild(logoutDiv);
        }
      });
    }

    // Persistent auth: Register button injection + Demo Login interception
    function setupPersistentAuth() {
      function injectRegister() {
        const isLogged = localStorage.getItem('token');

        // Fix logos everywhere
        document.querySelectorAll(
          '.header-dark,header,.page-header,.header-wrapper,.top-header,ion-header,ion-toolbar,.main-header,.left-sidemenu,ion-menu'
        ).forEach(header => {
          const logo = header.querySelector('img');
          if (logo && !logo.src.includes('Screenshot')) {
            logo.src = LOGO;
            logo.style.height = '28px';
            logo.style.width = 'auto';
          }
        });

        if (isLogged) return;

        const rightCont = document.querySelector('.header-right-cont');
        if (!rightCont) return;
        const notLoggedIn = rightCont.querySelector('.not-loggedIn');
        if (!notLoggedIn) return;

        const nativeLogin = notLoggedIn.querySelector('button,a');
        if (nativeLogin && !nativeLogin.classList.contains('custom-header-btn')) {
          nativeLogin.className = 'custom-header-btn login-btn';
        }
        if (!notLoggedIn.querySelector('.register-btn')) {
          const btn = document.createElement('button');
          btn.className = 'custom-header-btn register-btn';
          btn.innerText = 'Register';
          btn.onclick = (ev) => { ev.preventDefault(); window.showRegisterModal && window.showRegisterModal(); };
          notLoggedIn.style.cssText = 'display:flex !important;align-items:center !important;gap:6px !important;flex-direction:row !important;';
          notLoggedIn.appendChild(btn);
        }
      }

      window.handleMockLogin = function (btn) {
        if (btn) { btn.innerText = 'Logging in...'; btn.style.pointerEvents = 'none'; btn.style.opacity = '0.7'; }
        localStorage.setItem('token', 'mock_token_123');
        window.location.reload(true);
      };

      // Poll for login modal + demo button injection
      setInterval(() => {
        const isLogged = localStorage.getItem('token');
        if (isLogged) {
          document.querySelectorAll('ion-modal,ion-backdrop,.ion-overlay-wrapper').forEach(m => {
            try { if (m.dismiss) m.dismiss(); } catch (_) {}
            m.style.cssText = 'display:none !important;opacity:0 !important;pointer-events:none !important;';
          });
          return;
        }
        // Fix login modal logo
        document.querySelectorAll('.login-header-section,.login-header').forEach(header => {
          let logo = header.querySelector('img');
          if (logo && typeof logo.src === 'string' && !logo.src.includes('Screenshot')) {
            logo.src = LOGO;
            logo.style.cssText = 'height:70px !important;width:auto !important;object-fit:contain !important;display:block !important;margin:0 auto;';
          }
        });
        // Inject Demo Login button
        const loginBtns = document.querySelectorAll('.login-form button.btn.secondary-btn');
        loginBtns.forEach(loginBtn => {
          const parent = loginBtn.parentElement;
          if (parent && !parent.querySelector('.login-divider')) {
            const cloned = loginBtn.cloneNode(true);
            cloned.setAttribute('type', 'button');
            loginBtn.parentNode.replaceChild(cloned, loginBtn);
            cloned.insertAdjacentHTML('afterend', `
              <div class="login-divider">OR</div>
              <button type="button" class="demo-login-btn">Login with Demo ID</button>
            `);
            cloned.addEventListener('click', (ev) => { ev.preventDefault(); ev.stopPropagation(); window.handleMockLogin(cloned); }, true);
            const demoBtn = parent.querySelector('.demo-login-btn');
            if (demoBtn) demoBtn.onclick = (ev) => { ev.preventDefault(); ev.stopPropagation(); window.handleMockLogin(demoBtn); };
            const form = cloned.closest('form');
            if (form && !form.dataset.mockBound) {
              form.dataset.mockBound = 'true';
              form.addEventListener('submit', (ev) => { ev.preventDefault(); ev.stopPropagation(); ev.stopImmediatePropagation(); window.handleMockLogin(cloned); }, true);
            }
          }
        });
      }, 500);

      const observer = new MutationObserver(() => { injectRegister(); });
      observer.observe(document.body, { childList: true, subtree: true });
      injectRegister();
    }

    // Set vh CSS variable for mobile
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    window.addEventListener('resize', setVh);
    setVh();

    setupPersistentAuth();
    updateUI();
    const interval = setInterval(updateUI, 1000);
    return () => { clearInterval(interval); window.removeEventListener('resize', setVh); };
  }, []);

  return null;
}
