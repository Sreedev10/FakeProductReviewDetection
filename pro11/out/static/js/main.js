// Review Shield - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips (if using Bootstrap tooltips)
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Auto-dismiss alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(function(alert) {
        if (!alert.classList.contains('alert-danger')) {
            setTimeout(function() {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            }, 5000);
        }
    });

    // Form validation
    const forms = document.querySelectorAll('[novalidate]');
    Array.from(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // File input display
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(function(input) {
        input.addEventListener('change', function(e) {
            if (this.files && this.files[0]) {
                const fileName = this.files[0].name;
                const fileSize = (this.files[0].size / 1024).toFixed(2);
                
                // Find nearby element to display file info
                const fileInfo = this.parentElement.querySelector('.file-info');
                if (fileInfo) {
                    fileInfo.textContent = `Selected: ${fileName} (${fileSize} KB)`;
                }
            }
        });
    });
});

// Utility function to show loading state
function showLoading(element) {
    if (element) {
        element.disabled = true;
        const originalText = element.innerHTML;
        element.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Loading...';
        return originalText;
    }
}

// Utility function to hide loading state
function hideLoading(element, originalText) {
    if (element) {
        element.disabled = false;
        element.innerHTML = originalText;
    }
}

// Format number with thousands separator
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Format percentage
function formatPercent(value, decimals = 1) {
    return (value * 100).toFixed(decimals) + '%';
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        console.log('Copied to clipboard: ' + text);
        // Show notification
        const notification = document.createElement('div');
        notification.className = 'alert alert-success alert-dismissible fade show';
        notification.innerHTML = '<i class="fas fa-check-circle"></i> Copied to clipboard!<button type="button" class="btn-close" data-bs-dismiss="alert"></button>';
        document.body.insertBefore(notification, document.body.firstChild);
        
        setTimeout(function() {
            notification.remove();
        }, 2000);
    }).catch(function(err) {
        console.error('Failed to copy: ', err);
    });
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Search functionality
const searchInputs = document.querySelectorAll('input[placeholder*="Search"]');
searchInputs.forEach(function(input) {
    input.addEventListener('keyup', debounce(function(e) {
        const searchTerm = e.target.value.toLowerCase();
        // Filter logic here if needed
    }, 300));
});

// Toggle sidebar (for mobile)
function toggleSidebar() {
    const navbar = document.querySelector('.navbar-collapse');
    if (navbar) {
        navbar.classList.toggle('show');
    }
}

// Export data to CSV (example)
function exportTableToCSV(filename) {
    const table = document.querySelector('table');
    if (!table) return;

    let csv = [];
    const rows = table.querySelectorAll('tr');
    
    rows.forEach(function(row) {
        let csvRow = [];
        const cols = row.querySelectorAll('td, th');
        
        cols.forEach(function(col) {
            csvRow.push(col.innerText);
        });
        
        csv.push(csvRow.join(','));
    });

    downloadCSV(csv.join('\n'), filename);
}

// Download CSV
function downloadCSV(csv, filename) {
    const csvFile = new Blob([csv], {type: 'text/csv'});
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(csvFile);
    downloadLink.download = filename || 'export.csv';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

// Form reset helper
function resetForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
        form.classList.remove('was-validated');
    }
}

// Print page
function printPage() {
    window.print();
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll-to-top button functionality
document.addEventListener('scroll', function() {
    const scrollBtn = document.getElementById('scrollToTopBtn');
    if (scrollBtn) {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    }
});

// Calculate reading time
function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
}

// Format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}

// Get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Console logging for debugging
console.log('Review Shield - Application Loaded');
