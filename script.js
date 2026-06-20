document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Initialise AOS Animation Library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // 2. Light / Dark Theme Toggle Implementation
    const themeToggleBtn = document.getElementById("themeToggle");
    const htmlElement = document.documentElement;
    
    // Check local storage setting if set previously
    const savedTheme = localStorage.getItem("theme") || "light";
    htmlElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = htmlElement.getAttribute("data-theme");
        const targetTheme = currentTheme === "light" ? "dark" : "light";
        
        htmlElement.setAttribute("data-theme", targetTheme);
        localStorage.setItem("theme", targetTheme);
        updateThemeIcon(targetTheme);
        
        // Re-render chart to fit background palette colors perfectly
        if (growthChartInstance) {
            growthChartInstance.destroy();
            renderGrowthChart();
        }
    });

    function updateThemeIcon(theme) {
        const icon = themeToggleBtn.querySelector("i");
        if (theme === "dark") {
            icon.className = "fa-solid fa-sun text-warning";
        } else {
            icon.className = "fa-solid fa-moon";
        }
    }

    // 3. Automated Stats Counters Functionality
    const counterElements = document.querySelectorAll(".counter-num");
    
    const runCounters = () => {
        counterElements.forEach(counter => {
            const target = parseInt(counter.getAttribute("data-target"));
            const duration = 2000; // 2 seconds animation
            const stepTime = Math.max(Math.floor(duration / target), 15);
            let current = 0;
            
            const timer = setInterval(() => {
                current += 1;
                counter.textContent = current;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                }
            }, stepTime);
        });
    };

    // Intersection Observer for Counter triggers
    let observed = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !observed) {
                runCounters();
                observed = true;
            }
        });
    }, { threshold: 0.5 });

    const counterSection = document.querySelector(".counter-container");
    if (counterSection) {
        observer.observe(counterSection);
    }

    // 4. Financial Growth Chart Setup (Chart.js implementation)
    let growthChartInstance = null;

    const renderGrowthChart = () => {
        const ctx = document.getElementById("growthChart");
        if (!ctx) return;

        // Dynamic theme variable values retrieval for clean aesthetic compatibility
        const isDark = htmlElement.getAttribute("data-theme") === "dark";
        const gridColor = isDark ? "rgba(248, 250, 252, 0.08)" : "rgba(15, 23, 42, 0.05)";
        const labelColor = isDark ? "#94a3b8" : "#64748b";

        growthChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Year 1 Target', 'Year 2 Target', 'Year 3 Target'],
                datasets: [
                    {
                        label: 'Revenue (₹ Lakhs)',
                        data: [15, 35, 75],
                        backgroundColor: '#2563eb',
                        borderRadius: 6,
                        borderWidth: 0,
                        barThickness: 28,
                    },
                    {
                        label: 'Net Profit (₹ Lakhs)',
                        data: [5, 12, 30],
                        backgroundColor: '#06b6d4',
                        borderRadius: 6,
                        borderWidth: 0,
                        barThickness: 28,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: labelColor,
                            font: {
                                family: 'Inter',
                                size: 12,
                                weight: '500'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: isDark ? '#1e293b' : '#0f172a',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        cornerRadius: 8,
                        padding: 12
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: labelColor,
                            font: {
                                family: 'Plus Jakarta Sans',
                                weight: '600'
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: gridColor
                        },
                        ticks: {
                            color: labelColor,
                            callback: function(value) {
                                return '₹' + value + ' L';
                            },
                            font: {
                                family: 'Inter'
                            }
                        }
                    }
                }
            }
        });
    };

    renderGrowthChart();

    // 5. Contact Consultation Form Simulation
    const consultationForm = document.getElementById("consultationForm");
    const formSuccessAlert = document.getElementById("formSuccess");

    if (consultationForm) {
        consultationForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Gather standard input parameters
            const name = document.getElementById("fullName").value;
            const company = document.getElementById("companyName").value;
            const mobile = document.getElementById("mobileNo").value;
            const email = document.getElementById("emailAddr").value;
            const requirement = document.getElementById("businessReq").value;
            const message = document.getElementById("messageText").value;

            // Simple validation assertion checks
            if (name && company && mobile && email && requirement) {
                // Display simulated output confirmation
                formSuccessAlert.classList.remove("d-none");
                consultationForm.reset();
                
                // Automatically slide up/fade alert after 6 seconds
                setTimeout(() => {
                    formSuccessAlert.classList.add("d-none");
                }, 6000);
            }
        });
    }

    // 6. Dynamic Copyright Year Assignment
    const yearSpan = document.getElementById("currentYear");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
