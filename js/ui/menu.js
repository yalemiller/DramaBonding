// Mobile menu: a full-screen modal dialog whose links close it and then scroll to the section.

export function initMenu(dialog, openButton, scrollToSection) {
  openButton.addEventListener('click', () => dialog.showModal());

  dialog.addEventListener('click', event => {
    if (event.target.closest('[data-action="close-menu"]')) {
      dialog.close();
      return;
    }
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    event.preventDefault();
    dialog.close();
    scrollToSection(link.getAttribute('href').slice(1));
  });
}
