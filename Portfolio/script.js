document.addEventListener('DOMContentLoaded', function() {
    // Elementi DOM
    const projectRows = document.querySelectorAll('.riga-progetto');
    let currentOpenProject = null;
    
    // Rimuovi controlli da tutti i video per Safari
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(video => {
        video.removeAttribute('controls');
        video.setAttribute('playsinline', '');
    });
    
    // Navigation elements
    const projectNav = document.getElementById('project-nav');
    const aboutNav = document.getElementById('about-nav');
    const projectsSection = document.getElementById('projects-section');
    const aboutSection = document.getElementById('about-section');

    // Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggle2 = document.getElementById('theme-toggle2');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Applica tema salvato
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Aggiorna testo del toggle e video theme
    function updateToggleText(theme) {
        if (themeToggle) themeToggle.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
        if (themeToggle2) themeToggle2.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
        updateVideoTheme(theme);
    }
    
    // Funzione per aggiornare i video in base al tema
    function updateVideoTheme(theme) {
        const videos = document.querySelectorAll('.video-theme');
        videos.forEach(video => {
            const lightSrc = video.getAttribute('data-light');
            const darkSrc = video.getAttribute('data-dark');
            const newSrc = theme === 'dark' ? darkSrc : lightSrc;
            
            if (video.src !== newSrc) {
                video.src = newSrc;
                video.load();
                // Riavvia automaticamente il video
                video.play().catch(() => {
                    // Ignora errori di autoplay
                });
            }
        });
    }
    
    // Imposta testo iniziale e video tema
    updateToggleText(currentTheme);
    
    // Function to handle theme change
    function changeTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleText(newTheme);
    }
    
    // Add event listeners to both toggles
    if (themeToggle) themeToggle.addEventListener('click', changeTheme);
    if (themeToggle2) themeToggle2.addEventListener('click', changeTheme);

    // Navigation between PROJECT and ABOUT sections
    function showSection(sectionToShow, navToActivate) {
        // Hide all sections
        projectsSection.classList.remove('active');
        aboutSection.classList.remove('active');
        
        // Remove active class from all nav items
        projectNav.classList.remove('active');
        aboutNav.classList.remove('active');
        
        // Show selected section and activate nav item
        sectionToShow.classList.add('active');
        navToActivate.classList.add('active');
        
        // Close any open project when switching to about
        if (sectionToShow === aboutSection && currentOpenProject) {
            const currentDetailRow = document.getElementById('detail-' + currentOpenProject);
            const currentProjectRow = document.querySelector(`[data-project="${currentOpenProject}"]`);
            if (currentDetailRow) currentDetailRow.classList.remove('espanso');
            if (currentProjectRow) currentProjectRow.classList.remove('active');
            currentOpenProject = null;
        }
    }

    // Add event listeners for navigation
    projectNav.addEventListener('click', function() {
        showSection(projectsSection, projectNav);
    });

    aboutNav.addEventListener('click', function() {
        showSection(aboutSection, aboutNav);
    });

    // Dati dei progetti (puoi espandere con più informazioni)
    const projectData = {
        'de-donde-vienes': {
            name: 'DE DONDE VIENES?',
            type: 'BOOK',
            year: '2026',
            description: 'Un progetto editoriale che esplora le origini e le identità culturali attraverso un linguaggio visivo contemporaneo.',
            images: [
                'Copertina libro',
                'Pagina interna 1',
                'Pagina interna 2',
                'Layout tipografico',
                'Dettagli grafici'
            ]
        },
        'blabla': {
            name: 'BLABLA',
            type: 'BRAND IDENTITY',
            year: '2026',
            description: 'Sviluppo completo dell\'identità visiva per un brand innovativo nel settore della comunicazione.',
            images: [
                'Logo principale',
                'Varianti logo',
                'Palette colori',
                'Applicazioni brand',
                'Merchandise'
            ]
        },
        'emergenza-terra': {
            name: 'EMERGENZA TERRA',
            type: 'POSTER',
            year: '2026',
            description: 'Campagna di sensibilizzazione ambientale attraverso una serie di poster dal forte impatto visivo.',
            images: [
                'Poster principale',
                'Variante 1',
                'Variante 2',
                'Dettaglio tipografia',
                'Applicazione urbana'
            ]
        },
        'permaproject': {
            name: 'PERMAFROST',
            type: 'POSTER',
            year: '2026',
            description: 'Progetto di comunicazione visiva per la sostenibilità e la permacultura.',
            images: [
                'Design poster',
                'Elementi grafici',
                'Icone tematiche',
                'Layout finale',
                'Mockup applicativo'
            ]
        },
        'mamauso': {
            name: 'MAMUSIC',
            type: 'WEBSITE',
            year: '2026',
            description: 'Sviluppo di un sito web responsive con focus sull\'esperienza utente e design minimalista.',
            images: [
                'Homepage desktop',
                'Homepage mobile',
                'Pagina interna',
                'Navigazione',
                'Dettagli UI'
            ]
        },
        'sound-of-music': {
            name: 'SOUND OF MUSIC',
            type: 'APP',
            year: '2026',
            description: 'Applicazione mobile per la scoperta e condivisione di musica con interfaccia intuitiva.',
            images: [
                'Schermata principale',
                'Player musicale',
                'Lista brani',
                'Profilo utente',
                'Impostazioni'
            ]
        },
        'world-clock': {
            name: 'WORLD CLOCK',
            type: 'WIDGET',
            year: '2026',
            description: 'Widget desktop per la visualizzazione di fusi orari multipli con design elegante.',
            images: [
                'Interface widget',
                'Varianti tema',
                'Configurazione',
                'Stati widget',
                'Integrazione desktop'
            ]
        },
        'gonzalito': {
            name: 'GONZALITO',
            type: 'WIDGET',
            year: '2026',
            description: 'Widget personalizzabile per la produttività con approccio ludico al design.',
            images: [
                'Widget interface',
                'Personalizzazioni',
                'Animazioni',
                'Stati attivi',
                'Integrazione sistema'
            ]
        }
    };

    // Gestione click sui progetti per accordion
    projectRows.forEach(row => {
        row.addEventListener('click', function() {
            const projectId = this.dataset.project;
            toggleProject(projectId, this);
        });
    });

    // Funzione per aprire/chiudere i progetti (accordion)
    function toggleProject(projectId, clickedRow) {
        const detailRow = document.getElementById('detail-' + projectId);
        
        if (!detailRow) return;

        // Se è già aperto questo progetto, chiudilo
        if (currentOpenProject === projectId) {
            detailRow.classList.remove('espanso');
            clickedRow.classList.remove('active');
            currentOpenProject = null;
            return;
        }

        // Chiudi qualsiasi progetto attualmente aperto
        if (currentOpenProject) {
            const currentDetailRow = document.getElementById('detail-' + currentOpenProject);
            const currentProjectRow = document.querySelector(`[data-project="${currentOpenProject}"]`);
            if (currentDetailRow) currentDetailRow.classList.remove('espanso');
            if (currentProjectRow) currentProjectRow.classList.remove('active');
        }

        // Apri il nuovo progetto
        detailRow.classList.add('espanso');
        clickedRow.classList.add('active');
        currentOpenProject = projectId;

        // Non fare scroll automatico - mantieni la tabella ferma
    }

    // Gestione scroll orizzontale per tutte le gallerie
    const imageGalleries = document.querySelectorAll('.galleria-immagini');
    
    imageGalleries.forEach(imageGallery => {
        // Smooth scroll per la galleria
        let isDown = false;
        let startX;
        let scrollLeft;
        imageGallery.addEventListener('mousedown', (e) => {
            isDown = true;
            imageGallery.classList.add('active');
            startX = e.pageX - imageGallery.offsetLeft;
            scrollLeft = imageGallery.scrollLeft;
        });

        imageGallery.addEventListener('mouseleave', () => {
            isDown = false;
            imageGallery.classList.remove('active');
        });

        imageGallery.addEventListener('mouseup', () => {
            isDown = false;
            imageGallery.classList.remove('active');
        });

        imageGallery.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - imageGallery.offsetLeft;
            const walk = (x - startX) * 2;
            imageGallery.scrollLeft = scrollLeft - walk;
        });
    });

    // Lightbox Gallery
    let currentImages = [];
    let currentImageIndex = 0;

    // Aggiungi event listener per tutte le immagini dei progetti
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('immagine-progetto')) {
            const gallery = e.target.closest('.galleria-immagini');
            if (gallery) {
                currentImages = Array.from(gallery.querySelectorAll('.immagine-progetto'));
                currentImageIndex = currentImages.indexOf(e.target);
                openLightbox();
            }
        }
    });

    function openLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxVideo = document.getElementById('lightbox-video');
        const currentImageCounter = document.getElementById('current-image');
        const totalImagesCounter = document.getElementById('total-images');

        lightbox.classList.add('active');
        
        // Gestione speciale per video nella lightbox
        if (currentImages[currentImageIndex].classList.contains('video-theme')) {
            // Nascondi immagine, mostra video
            lightboxImage.style.display = 'none';
            lightboxVideo.style.display = 'block';
            
            const video = currentImages[currentImageIndex];
            const darkSrc = video.getAttribute('data-dark');
            lightboxVideo.src = darkSrc || video.src;
            lightboxVideo.load();
            lightboxVideo.play();
        } else {
            // Nascondi video, mostra immagine
            lightboxVideo.style.display = 'none';
            lightboxImage.style.display = 'block';
            
            lightboxImage.src = currentImages[currentImageIndex].src;
            lightboxImage.alt = currentImages[currentImageIndex].alt || 'Project Image';
        }
        
        currentImageCounter.textContent = currentImageIndex + 1;
        totalImagesCounter.textContent = currentImages.length;

        // Blocca lo scroll della pagina
        document.body.style.overflow = 'hidden';
        
        // Aggiungi event listeners per cursore personalizzato
        setupLightboxCursor();
    }
    
    let lightboxEventListenersAdded = false;
    
    function setupLightboxCursor() {
        const lightbox = document.getElementById('lightbox');
        const cursor = document.getElementById('lightbox-cursor');
        
        // Evita di aggiungere listener multipli
        if (!lightboxEventListenersAdded) {
            lightbox.addEventListener('mousemove', function(e) {
                const rect = lightbox.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const isRightSide = x > rect.width / 2;
                
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                cursor.textContent = isRightSide ? 'NEXT' : 'PREVIOUS';
            });
            
            lightbox.addEventListener('click', function(e) {
                console.log('Lightbox clicked!'); // Debug
                // Permetti click ovunque nel lightbox tranne sul contatore
                if (!e.target.closest('.lightbox-counter')) {
                    const rect = lightbox.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const isRightSide = x > rect.width / 2;
                    
                    console.log('Direction:', isRightSide ? 'NEXT' : 'PREVIOUS'); // Debug
                    if (isRightSide) {
                        changeImage(1);
                    } else {
                        changeImage(-1);
                    }
                }
            });
            
            lightboxEventListenersAdded = true;
        }
        
        // Gestione hover sulla X per nascondere cursore
        const closeButton = lightbox.querySelector('.lightbox-close');
        if (closeButton) {
            closeButton.addEventListener('mouseenter', function() {
                cursor.style.opacity = '0';
            });
            
            closeButton.addEventListener('mouseleave', function() {
                cursor.style.opacity = '1';
            });
        }
    }
    // Funzioni lightbox
    function closeLightboxInternal() {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('active');
        // Ripristina lo scroll della pagina
        document.body.style.overflow = 'auto';
    }

    function changeImage(direction) {
        currentImageIndex += direction;
        
        // Loop delle immagini
        if (currentImageIndex >= currentImages.length) {
            currentImageIndex = 0;
        } else if (currentImageIndex < 0) {
            currentImageIndex = currentImages.length - 1;
        }
        
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxVideo = document.getElementById('lightbox-video');
        const currentImageCounter = document.getElementById('current-image');
        
        // Gestione speciale per video nella lightbox
        if (currentImages[currentImageIndex].classList.contains('video-theme')) {
            // Nascondi immagine, mostra video
            lightboxImage.style.display = 'none';
            lightboxVideo.style.display = 'block';
            
            const video = currentImages[currentImageIndex];
            const darkSrc = video.getAttribute('data-dark');
            lightboxVideo.src = darkSrc || video.src;
            lightboxVideo.load();
            lightboxVideo.play();
        } else {
            // Nascondi video, mostra immagine
            lightboxVideo.style.display = 'none';
            lightboxImage.style.display = 'block';
            
            lightboxImage.src = currentImages[currentImageIndex].src;
            lightboxImage.alt = currentImages[currentImageIndex].alt || 'Project Image';
        }
        
        currentImageCounter.textContent = currentImageIndex + 1;
    }
    
    // Event listener per tastiera
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightboxInternal();
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        }
    });
    
    // Rendi le funzioni globali per compatibilità
    window.closeLightbox = closeLightboxInternal;
    window.changeImage = changeImage;
});