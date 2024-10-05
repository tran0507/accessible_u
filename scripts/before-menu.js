/*
 * JavaScript for Accessible University Demo Site
 * http://uw.edu/accesscomputing/AU
 *
 * before-menu.js = Custom inaccessible Dropdown Menu
 */

// $(document).ready(function() {

//   var timeout = 3000;
//   var timer = 0;
//   var subMenu = null;

//   $("#menu > li")
//     .on('mouseenter',function(){
//       // close previously open submenu
//       closeSubMenu();
//       // get and show new submenu
//       subMenu = $(this).children('ul');
//       subMenu.show();
//       clearTimeout(timer);
//     })
//     .parent().mouseout(function(){
//       clearTimeout(timer);
//       timer = setTimeout(function(){
//         closeSubMenu();
//       },timeout);
//     });

//   // close subMenu when click-out
//   document.onclick = closeSubMenu;

//   function closeSubMenu() {
//     if (subMenu) {
//       subMenu.hide();
//       subMenu = null;
//     }
//   }
// });

    document.addEventListener('DOMContentLoaded', () => {
      const dropdown = document.querySelector('.nav-item.dropdown');
      const toggle = dropdown.querySelector('.dropdown-toggle');
      const menu = dropdown.querySelector('.dropdown-menu');
  
      toggle.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              toggleDropdown();
          }
      });
  
      dropdown.addEventListener('keydown', (event) => {
          const items = menu.querySelectorAll('.dropdown-item');
          let index = Array.from(items).indexOf(document.activeElement);
  
          if (event.key === 'ArrowDown') {
              event.preventDefault();
              if (index < items.length - 1) {
                  items[index + 1].focus();
              } else {
                  items[0].focus(); // Loop to the first item
              }
          } else if (event.key === 'ArrowUp') {
              event.preventDefault();
              if (index > 0) {
                  items[index - 1].focus();
              } else {
                  items[items.length - 1].focus(); // Loop to the last item
              }
          } else if (event.key === 'Escape') {
              closeDropdown();
          }
      });
  
      toggle.addEventListener('click', () => {
          toggleDropdown();
      });
  
      function toggleDropdown() {
          const expanded = toggle.getAttribute('aria-expanded') === 'true';
          toggle.setAttribute('aria-expanded', !expanded);
          menu.classList.toggle('show', !expanded);
          if (!expanded) {
              menu.querySelector('.dropdown-item').focus(); // Focus the first item when opening
          } else {
              toggle.focus(); // Return focus to toggle when closing
          }
      }
  
      function closeDropdown() {
          toggle.setAttribute('aria-expanded', 'false');
          menu.classList.remove('show');
          toggle.focus();
      }
  });
