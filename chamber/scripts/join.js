const timestampInput = document.getElementById('timestamp');
if (timestampInput) {
    timestampInput.value = new Date().toLocaleString();
}


const modalLinks = document.querySelectorAll('[data-modal]');
modalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = link.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) modal.showModal();
    });
});

const closeButtons = document.querySelectorAll('dialog button.close');
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.closest('dialog').close();
    });
});
