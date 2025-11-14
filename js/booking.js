
const chairContainer = document.getElementById('chairContainer');
const reserveButton = document.getElementById('reservBtn');
const dateInput = document.getElementById('date');
const timeSelect = document.getElementById('time');

// Restaurant settings
const openingTime = 10; // 
const closingTime = 22; // 
const timeGap = 60; // 

//  time slots 
function generateTimeSlots() {
    timeSelect.innerHTML = "";
    const now = new Date();

    for (let hour = openingTime; hour < closingTime; hour++) {
        for (let minute = 0; minute < 60; minute += timeGap) {
            const slotDate = new Date();
            slotDate.setHours(hour, minute, 0, 0);

            const time24 = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
            const ampm = hour >= 12 ? "PM" : "AM";
            const displayHour = ((hour + 11) % 12 + 1);
            const displayTime = `${displayHour}:${String(minute).padStart(2, '0')} ${ampm}`;

            const option = document.createElement('option');
            option.value = time24;
            option.textContent = displayTime;

            //  Disable past times for today
            const selectedDate = new Date(dateInput.value);
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            if (selectedDate.getTime() === today.getTime() && slotDate < now) {
                option.disabled = true;
            }

            timeSelect.appendChild(option);
        }
    }
}

//  Restrict date input to today 
const today = new Date();
const todayStr = today.toISOString().split("T")[0];
dateInput.min = todayStr;

//  Create chairs
for (let i = 1; i <= 20; i++) {
    const chair = document.createElement("div");
    chair.classList.add('chair', 'available');
    chair.textContent = i;

    chair.addEventListener('click', () => {
        if (chair.classList.contains('reserved')) return;
        chair.classList.toggle('selected');
    });

    chairContainer.appendChild(chair);
}

//  Load reservations
function loadReservation() {
    const date = dateInput.value;
    const time = timeSelect.value;
    if (!date || !time) return;

    const key = `${date}_${time}`;
    const reservedSeats = JSON.parse(localStorage.getItem(key)) || [];

    document.querySelectorAll('.chair').forEach(chair => {
        const chairNumber = parseInt(chair.textContent);
        chair.classList.remove('reserved', 'selected', 'available');

        if (reservedSeats.includes(chairNumber)) {
            chair.classList.add('reserved');
        } else {
            chair.classList.add('available');
        }
    });
}

//  Save selected chairs
reserveButton.addEventListener('click', () => {
    const date = dateInput.value;
    const time = timeSelect.value;

    if (!date || !time) {
        alert('Please select both date and time.');
        return;
    }

    const selectedDateTime = new Date(`${date}T${time}`);
    const now = new Date();

    // Prevent booking for past times
    if (selectedDateTime < now) {
        alert('You cannot book past time slots.');
        return;
    }

    const key = `${date}_${time}`;
    const existingReservations = JSON.parse(localStorage.getItem(key)) || [];

    const selectedChairs = Array.from(document.querySelectorAll('.chair.selected'))
        .map(chair => parseInt(chair.textContent));

    const updatedReservations = [...new Set([...existingReservations, ...selectedChairs])];
    localStorage.setItem(key, JSON.stringify(updatedReservations));

    alert('Your reservation has been saved.');
    loadReservation();
});

//  Events
dateInput.addEventListener('change', () => {
    generateTimeSlots();
    loadReservation();
});
timeSelect.addEventListener('change', loadReservation);

// Initialize page
generateTimeSlots();
