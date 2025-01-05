document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const newsInput = document.getElementById('newsInput');
    const checkButton = document.getElementById('checkButton');
    const output = document.getElementById('output');
    const error = document.getElementById('error');
    const wordCountElement = document.getElementById('wordCount');
    const charCountElement = document.getElementById('charCount');
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const faqItems = document.querySelectorAll('.faq-item');
    const shareButton = document.querySelector('.share-button');

    // Mobile menu toggle
    mobileMenuButton?.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // FAQ accordion functionality
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Close all other FAQs
            faqItems.forEach(faq => faq.classList.remove('active'));
            // Toggle current FAQ
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Statistics animation
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // Animation duration in milliseconds
            const step = target / (duration / 16); // Update every 16ms (60fps)
            let current = 0;

            const updateStat = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateStat);
                } else {
                    stat.textContent = target.toLocaleString();
                }
            };

            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateStat();
                    observer.disconnect();
                }
            });

            observer.observe(stat);
        });
    }

    // Initialize statistics animation
    animateStats();

    // Word and character count functionality
    newsInput.addEventListener('input', () => {
        const text = newsInput.value;
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        const chars = text.length;

        wordCountElement.textContent = words.length;
        charCountElement.textContent = chars;

        // Enable/disable button based on input
        checkButton.disabled = words.length === 0;
    });

    // Share functionality
    shareButton?.addEventListener('click', async () => {
        const prediction = output.querySelector('.prediction-text').textContent;
        const confidence = output.querySelector('.confidence-score').textContent;

        try {
            await navigator.share({
                title: 'Fake News Detection Result',
                text: `Analysis Result: ${prediction}\n${confidence}\nAnalyzed with FakeNewsGuard`,
                url: window.location.href
            });
        } catch (err) {
            console.log('Sharing failed:', err);
            // Fallback to clipboard copy
            const text = `Analysis Result: ${prediction}\n${confidence}\nAnalyzed with FakeNewsGuard`;
            navigator.clipboard.writeText(text).then(() => {
                alert('Result copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy:', err);
            });
        }
    });

    // Main analysis function
    async function analyzeFakeNews(text) {
        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ text })
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            return await response.json();
        } catch (err) {
            if (err.name === 'TypeError') {
                throw new Error('Unable to connect to the server. Please check your internet connection.');
            }
            throw err;
        }
    }

    // UI helper functions
    function setLoading(isLoading) {
        const buttonText = checkButton.querySelector('.button-text');
        const spinner = checkButton.querySelector('.spinner');

        checkButton.disabled = isLoading;
        buttonText.textContent = isLoading ? 'Analyzing...' : 'Analyze Article';
        spinner.classList.toggle('hidden', !isLoading);
    }

    function showResult(result) {
        const predictionText = output.querySelector('.prediction-text');
        const meterFill = output.querySelector('.meter-fill');
        const confidenceScore = output.querySelector('.confidence-score');
        const timestamp = output.querySelector('.timestamp');

        // Set prediction text and style
        predictionText.textContent = `Verdict: ${result.prediction}`;
        predictionText.style.color = result.prediction.toLowerCase().includes('fake') ? 
            'var(--error-color)' : 'var(--success-color)';

        // Update confidence meter
        const confidenceValue = result.confidence || 0.5;
        meterFill.style.width = `${confidenceValue * 100}%`;
        meterFill.style.backgroundColor = result.prediction.toLowerCase().includes('fake') ? 
            'var(--error-color)' : 'var(--success-color)';

        // Update confidence score
        confidenceScore.textContent = `Confidence: ${(confidenceValue * 100).toFixed(1)}%`;

        // Update timestamp
        timestamp.textContent = `Analyzed on ${new Date().toLocaleString()}`;

        // Show output
        output.classList.remove('hidden');

        // Scroll to result
        output.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function showError(message) {
        const errorMessage = error.querySelector('.error-message');
        errorMessage.textContent = message;
        error.classList.remove('hidden');
        error.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function hideError() {
        error.classList.add('hidden');
    }

    function hideOutput() {
        output.classList.add('hidden');
    }

    // Main check news function
    checkButton.addEventListener('click', async () => {
        const text = newsInput.value.trim();

        if (!text) {
            showError('Please enter some text to analyze.');
            return;
        }

        setLoading(true);
        hideError();
        hideOutput();

        try {
            const result = await analyzeFakeNews(text);
            showResult(result);
        } catch (err) {
            showError(err.message);
        } finally {
            setLoading(false);
        }
    });

    // Handle Enter key in textarea
    newsInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey && !checkButton.disabled) {
            checkButton.click();
        }
    });
});