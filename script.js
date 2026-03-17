// Readymode Lead-Forward UI Demo - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Initialize tab switching
    initializeTabs();
    
    // Initialize dialpad
    initializeDialpad();
    
    // Initialize call functionality
    initializeCallFeatures();
    
    // Initialize campaign buttons
    initializeCampaigns();
    
    // Initialize action buttons
    initializeActionButtons();
    
    console.log('🎯 Readymode Lead-Forward Demo Initialized');
}

// Tab Navigation
function initializeTabs() {
    const navItems = document.querySelectorAll('.nav-item[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetTab = item.dataset.tab;
            
            // Update nav active state
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Update tab content
            tabContents.forEach(content => content.classList.remove('active'));
            const targetContent = document.getElementById(`${targetTab}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Analytics
            console.log(`📊 Tab switched to: ${targetTab}`);
        });
    });
}

// Dialpad Functionality
function initializeDialpad() {
    const dialButtons = document.querySelectorAll('.dial-btn[data-digit]');
    const phoneInput = document.getElementById('phone-number');
    
    dialButtons.forEach(button => {
        button.addEventListener('click', () => {
            const digit = button.dataset.digit;
            
            // Add visual feedback
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 100);
            
            // Add digit to phone number (simple implementation)
            if (phoneInput) {
                const currentValue = phoneInput.value;
                // For demo purposes, just add to end if it's not the default number
                if (currentValue === '(305) 555-7829') {
                    phoneInput.value = digit;
                } else {
                    phoneInput.value += digit;
                }
            }
            
            // Play dial tone sound (if available)
            playDialTone(digit);
            
            console.log(`📞 Dialed: ${digit}`);
        });
    });
}

// Call Features
function initializeCallFeatures() {
    const dialBtn = document.getElementById('dial-btn');
    const hangupBtn = document.getElementById('hangup-btn');
    const callStatus = document.getElementById('call-status');
    const dialpadSection = document.querySelector('.dialpad-section');
    
    let callTimer = null;
    let callDuration = 0;
    
    // Dial button functionality
    if (dialBtn) {
        dialBtn.addEventListener('click', () => {
            startCall();
        });
    }
    
    // Hangup button functionality
    if (hangupBtn) {
        hangupBtn.addEventListener('click', () => {
            endCall();
        });
    }
    
    function startCall() {
        console.log('📞 Starting call to Jennifer Rodriguez...');
        
        // Show call status, hide dialpad
        if (callStatus && dialpadSection) {
            dialpadSection.style.display = 'none';
            callStatus.style.display = 'block';
        }
        
        // Start call timer
        callDuration = 0;
        const timerDisplay = document.querySelector('.call-timer');
        callTimer = setInterval(() => {
            callDuration++;
            if (timerDisplay) {
                const minutes = Math.floor(callDuration / 60).toString().padStart(2, '0');
                const seconds = (callDuration % 60).toString().padStart(2, '0');
                timerDisplay.textContent = `${minutes}:${seconds}`;
            }
        }, 1000);
        
        // Update button states
        if (dialBtn) {
            dialBtn.disabled = true;
            dialBtn.textContent = '📞 CALLING...';
        }
        
        // Simulate call pickup after 3 seconds
        setTimeout(() => {
            console.log('✅ Call connected!');
            document.querySelector('.calling-text').textContent = 'Connected - Jennifer Rodriguez';
        }, 3000);
    }
    
    function endCall() {
        console.log(`📞 Call ended. Duration: ${callDuration}s`);
        
        // Clear timer
        if (callTimer) {
            clearInterval(callTimer);
            callTimer = null;
        }
        
        // Reset UI
        if (callStatus && dialpadSection) {
            callStatus.style.display = 'none';
            dialpadSection.style.display = 'flex';
        }
        
        if (dialBtn) {
            dialBtn.disabled = false;
            dialBtn.textContent = '📞 DIAL NOW';
        }
        
        // Show call completion options
        showCallDisposition();
    }
}

// Campaign Selection
function initializeCampaigns() {
    const campaignButtons = document.querySelectorAll('.campaign-btn[data-campaign]');
    
    campaignButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            campaignButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const campaign = button.dataset.campaign;
            console.log(`📋 Campaign selected: ${campaign}`);
            
            // In a real app, this would update lead queue and available numbers
            updateCampaignUI(campaign);
        });
    });
}

function updateCampaignUI(campaign) {
    // Update any campaign-specific UI elements
    const leadCard = document.querySelector('.lead-card');
    if (leadCard) {
        // Add subtle visual feedback
        leadCard.style.borderColor = '#4299e1';
        setTimeout(() => {
            leadCard.style.borderColor = '';
        }, 300);
    }
}

// Action Buttons
function initializeActionButtons() {
    const appointmentBtn = document.getElementById('appointment-btn');
    const notesBtn = document.getElementById('notes-btn');
    const rescheduleBtn = document.getElementById('reschedule-btn');
    
    if (appointmentBtn) {
        appointmentBtn.addEventListener('click', () => {
            showAppointmentModal();
        });
    }
    
    if (notesBtn) {
        notesBtn.addEventListener('click', () => {
            showNotesModal();
        });
    }
    
    if (rescheduleBtn) {
        rescheduleBtn.addEventListener('click', () => {
            showRescheduleModal();
        });
    }
}

// Modal Functions (simplified for demo)
function showAppointmentModal() {
    const message = `✅ APPOINTMENT SCHEDULED
    
Lead: Jennifer Rodriguez
Time: Tomorrow 2:00 PM EST
Agent: Sarah Martinez

This would open a full appointment scheduling interface in the real application.`;
    
    alert(message);
    console.log('📅 Appointment modal opened');
}

function showNotesModal() {
    const newNote = prompt('Add a note about this lead:', 'Follow-up call completed. Customer very interested.');
    if (newNote) {
        console.log(`📝 Note added: ${newNote}`);
        
        // In real app, would update the notes section
        const notesContent = document.querySelector('.notes-content');
        if (notesContent) {
            const noteDiv = document.createElement('div');
            noteDiv.className = 'note-section';
            noteDiv.innerHTML = `<strong>Agent Note (${new Date().toLocaleDateString()}):</strong> ${newNote}`;
            notesContent.appendChild(noteDiv);
        }
    }
}

function showRescheduleModal() {
    const message = `⏰ RESCHEDULE OPTIONS

Current: Today 2-4 PM EST

Available slots:
• Tomorrow 10-12 PM EST
• Tomorrow 2-4 PM EST  
• Wednesday 1-3 PM EST

This would open a full scheduling interface in the real application.`;
    
    alert(message);
    console.log('⏰ Reschedule modal opened');
}

function showCallDisposition() {
    const disposition = prompt(`📊 CALL DISPOSITION

How did the call end?

Options:
- Appointment Set
- Callback Scheduled  
- Not Interested
- Wrong Number
- No Answer

Enter your choice:`, 'Appointment Set');
    
    if (disposition) {
        console.log(`📊 Call disposition: ${disposition}`);
        
        // Update stats (demo)
        updateCallStats(disposition);
    }
}

function updateCallStats(disposition) {
    // Update the stats cards with new data
    const statsCards = document.querySelectorAll('.stat-card');
    
    // Simulate updating stats based on disposition
    if (disposition.toLowerCase().includes('appointment')) {
        // Increment appointments
        const appointmentCard = statsCards[2];
        if (appointmentCard) {
            const number = appointmentCard.querySelector('.stat-number');
            const current = parseInt(number.textContent) || 0;
            number.textContent = current + 1;
            
            // Visual feedback
            appointmentCard.style.background = '#c6f6d5';
            setTimeout(() => {
                appointmentCard.style.background = '';
            }, 1000);
        }
    }
    
    // Always increment calls today
    const callsCard = statsCards[1];
    if (callsCard) {
        const number = callsCard.querySelector('.stat-number');
        const current = parseInt(number.textContent) || 0;
        number.textContent = current + 1;
    }
}

// Audio Functions (placeholder)
function playDialTone(digit) {
    // In a real application, this would play DTMF tones
    console.log(`🎵 Playing tone for: ${digit}`);
}

// Utility Functions
function formatPhoneNumber(number) {
    // Simple phone number formatting
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6,10)}`;
    }
    return number;
}

// Demo Features
function addDemoInteractions() {
    // Add extra interactivity for demo purposes
    
    // Hover effects on lead cards
    const leadCard = document.querySelector('.lead-card');
    if (leadCard) {
        leadCard.addEventListener('mouseenter', () => {
            console.log('💡 Lead card hovered - showing interactive elements');
        });
    }
    
    // Search functionality (basic)
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            console.log(`🔍 Searching for: ${e.target.value}`);
        });
    }
}

// Initialize demo interactions
setTimeout(() => {
    addDemoInteractions();
}, 1000);

// Export for debugging
window.ReadymodeDemo = {
    initializeApp,
    startCall: () => document.getElementById('dial-btn').click(),
    switchTab: (tab) => document.querySelector(`[data-tab="${tab}"]`).click(),
    selectCampaign: (campaign) => document.querySelector(`[data-campaign="${campaign}"]`).click()
};