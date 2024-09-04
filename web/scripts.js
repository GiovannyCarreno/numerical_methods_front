document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('sidebar');
    var navbarToggler = document.querySelector('.navbar-toggler');

    navbarToggler.addEventListener('click', function () {
        var bsOffcanvas = new bootstrap.Offcanvas(sidebar);
        bsOffcanvas.toggle();
    });

    // Ocultar el menú desplegable al hacer clic en los enlaces del offcanvas
    var offcanvasLinks = document.querySelectorAll('#sidebar .nav-link');
    offcanvasLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            var bsOffcanvas = bootstrap.Offcanvas.getInstance(sidebar);
            if (bsOffcanvas) {
                bsOffcanvas.hide();
            }
        });
    });
});
