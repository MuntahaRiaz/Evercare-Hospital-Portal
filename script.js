window.onload = function() {
  let slideIndex = 0;
  const slides = document.getElementsByClassName("slides");

  function showSlides() {
    for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 5000);
  }
  showSlides();


  const popup = document.getElementById("servicePopup");
  const popupTitle = document.getElementById("popupTitle");
  const popupContent = document.getElementById("popupContent");
  const closeBtn = document.getElementById("closePopup");



  const doctors = {
    "General": { "Dr Samiya": ["9AM","10AM"], "Dr Sara": ["11AM"] },
    "Cardiology": { "Dr Hammad": ["9AM"], "Dr Aliza": ["10AM"] },
    "ER": { "Dr Areesha": ["9AM","11AM"], "Dr Muntaha": ["10AM"] }
  };

  


  const labs = {
    "Blood Test": { "Lab A": ["9AM","10AM"], "Lab B": ["11AM"] },
    "X-Ray": { "Radiology 1": ["9AM","10AM"], "Radiology 2": ["11AM"] },
    "MRI": { "Imaging 1": ["9AM"], "Imaging 2": ["10AM"] }
  };

window.openServicePopup = function(service) {
  popup.style.display = "flex";
  popupTitle.innerText = service;
  popupContent.innerHTML = "";

  if(service === "Consultation") {
    popupContent.innerHTML = `
      <label>Patient Name:</label><input type="text" id="pName" placeholder="Enter name">
      <label>Patient Age:</label><input type="number" id="pAge" placeholder="Enter age">
      <label>Select Department:</label>
      <select id="pDept">
        <option value="General">General</option>
        <option value="Cardiology">Cardiology</option>
        <option value="ER">ER</option>
      </select>
      <label>Select Doctor:</label><select id="pDoctor"></select>
      <label>Select Time Slot:</label><select id="pSlot"></select>
      <button id="bookBtn">Book Appointment</button>
      <button id="viewTimings">View Timings</button>
    `;

    const deptSelect = document.getElementById("pDept");
    const doctorSelect = document.getElementById("pDoctor");
    const slotSelect = document.getElementById("pSlot");
    const viewBtn = document.getElementById("viewTimings");

    
    function updateDoctors() {
      doctorSelect.innerHTML = "";
      const dept = deptSelect.value;
      for(let doc in doctors[dept]){
        let opt = document.createElement("option");
        opt.value = doc; opt.innerText = doc;
        doctorSelect.appendChild(opt);
      }
      updateSlots(); 
    }


    function updateSlots() {
      slotSelect.innerHTML = "";
      const dept = deptSelect.value;
      const doc = doctorSelect.value;
      doctors[dept][doc].forEach(slot => {
        let opt = document.createElement("option");
        opt.value = slot; opt.innerText = slot;
        slotSelect.appendChild(opt);
      });
      if(doctors[dept][doc].length === 0) {
        let opt = document.createElement("option");
        opt.value = "";
        opt.innerText = "No slots available";
        slotSelect.appendChild(opt);
      }
    }

    deptSelect.onchange = updateDoctors;
    doctorSelect.onchange = updateSlots;

    updateDoctors(); 

    document.getElementById("bookBtn").onclick = function() {
      const name = document.getElementById("pName").value;
      const age = document.getElementById("pAge").value;
      const dept = deptSelect.value;
      const doc = doctorSelect.value;
      const slot = slotSelect.value;

      if(!name || !age){ alert("Enter valid details"); return; }
      if(!slot){ alert("Please select a valid slot"); return; }

      alert(`Appointment booked!\nPatient: ${name}, Age: ${age}\nDoctor: ${doc} (${dept})\nTime: ${slot}`);
      
      doctors[dept][doc] = doctors[dept][doc].filter(s => s !== slot);
      popup.style.display = "none";
    };

    viewBtn.onclick = function() {
      const dept = deptSelect.value;
      let timings = `Doctor timings for ${dept}:\n`;
      for(let doc in doctors[dept]){
        timings += `${doc}: ${doctors[dept][doc].join(", ") || "No slots available"}\n`;
      }
      alert(timings);
    };
  }

    else if(service === "Lab") {
      popupContent.innerHTML = `
        <label>Select Lab Test:</label>
        <select id="labTest">
          <option value="Blood Test">Blood Test</option>
          <option value="X-Ray">X-Ray</option>
          <option value="MRI">MRI</option>
        </select>
        <label>Select Lab Incharge:</label><select id="labDoctor"></select>
        <label>Select Time Slot:</label><select id="labSlot"></select>
        <button id="labBookBtn">Book Lab Appointment</button>
        <button id="labViewBtn">View Timings</button>
      `;

      const labSelect = document.getElementById("labTest");
      const labDoctor = document.getElementById("labDoctor");
      const labSlot = document.getElementById("labSlot");
      const labViewBtn = document.getElementById("labViewBtn");

      function updateLabDoctors() {
        labDoctor.innerHTML = "";
        const lab = labSelect.value;
        for(let doc in labs[lab]){
          let opt = document.createElement("option");
          opt.value = doc; opt.innerText = doc;
          labDoctor.appendChild(opt);
        }
        updateLabSlots();
      }

      function updateLabSlots() {
        labSlot.innerHTML = "";
        const lab = labSelect.value;
        const doc = labDoctor.value;
        labs[lab][doc].forEach(slot => {
          let opt = document.createElement("option");
          opt.value = slot; opt.innerText = slot;
          labSlot.appendChild(opt);
        });
      }

      labSelect.onchange = updateLabDoctors;
      labDoctor.onchange = updateLabSlots;
      updateLabDoctors();

      document.getElementById("labBookBtn").onclick = function() {
        const lab = labSelect.value;
        const doc = labDoctor.value;
        const slot = labSlot.value;
        alert(`Lab appointment booked!\nLab Test: ${lab}\nIncharge: ${doc}\nTime: ${slot}`);
        labs[lab][doc] = labs[lab][doc].filter(s => s !== slot);
        popup.style.display = "none";
      };

      labViewBtn.onclick = function() {
        const lab = labSelect.value;
        let timings = `Timings for ${lab}:\n`;
        for(let doc in labs[lab]){
          timings += `${doc}: ${labs[lab][doc].join(", ")}\n`;
        }
        alert(timings);
      };
    }

    else if(service === "Emergency") {
      popupContent.innerHTML = `<p>24/7 emergency care available. Call or visit immediately for urgent treatment.</p>`;
    }
  };



  closeBtn.onclick = () => { popup.style.display = "none"; };
  window.onclick = (e) => { if(e.target === popup) popup.style.display = "none"; };

}
