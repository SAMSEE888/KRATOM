// ฟังก์ชันคำนวณ
function calculate() {
    // รับค่าจำนวนขวดจากผู้ใช้
    const bottles1000Input = document.getElementById('bottles1000');
    const bottles800Input = document.getElementById('bottles800');
    
    const bottles1000 = parseFloat(bottles1000Input.value);
    const bottles800 = parseFloat(bottles800Input.value);
    
    // ตรวจสอบว่าผู้ใช้กรอกข้อมูลหรือไม่
    if ((isNaN(bottles1000) || bottles1000 < 0) && (isNaN(bottles800) || bottles800 < 0)) {
        alert('กรุณากรอกจำนวนขวดน้ำอย่างน้อยหนึ่งช่อง');
        bottles1000Input.focus();
        return;
    }
    
    // ตรวจสอบว่ากรอกข้อมูลทั้งสองช่อง
    if (!isNaN(bottles1000) && bottles1000 >= 0 && !isNaN(bottles800) && bottles800 >= 0) {
        alert('กรุณากรอกข้อมูลเพียงช่องเดียวเท่านั้น');
        return;
    }
    
    let totalML, bottles1000ml, bottles800ml, totalPrice, calculationType;
    
    // คำนวณตามข้อมูลที่ป้อน
    if (!isNaN(bottles1000) && bottles1000 >= 0) {
        // คำนวณจากขวด 1,000 มล.
        totalML = bottles1000 * 1000;
        bottles1000ml = bottles1000;
        bottles800ml = totalML / 800;
        calculationType = "from1000";
    } else {
        // คำนวณจากขวด 800 มล.
        totalML = bottles800 * 800;
        bottles800ml = bottles800;
        bottles1000ml = totalML / 1000;
        calculationType = "from800";
    }
    
    // คำนวณราคารวม
    totalPrice = bottles1000ml * 40;
    
    // แสดงผลลัพธ์
    const resultDiv = document.getElementById('result');
    const resultText = document.getElementById('resultText');
    const detailsDiv = document.getElementById('details');
    
    if (calculationType === "from1000") {
        resultText.innerHTML = `<i class="fas fa-exchange-alt"></i> ${bottles1000} ขวด (1,000 มล.) = ${bottles800ml.toFixed(2)} ขวด (800 มล.)`;
    } else {
        resultText.innerHTML = `<i class="fas fa-exchange-alt"></i> ${bottles800} ขวด (800 มล.) = ${bottles1000ml.toFixed(2)} ขวด (1,000 มล.)`;
    }
    
    detailsDiv.innerHTML = `
        <div class="detail-item">
            <span class="detail-label">ปริมาณน้ำทั้งหมด:</span>
            <span class="detail-value">${totalML.toLocaleString()} มล.</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">จำนวนขวด 1,000 มล.:</span>
            <span class="detail-value">${bottles1000ml.toFixed(2)} ขวด</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">จำนวนขวด 800 มล.:</span>
            <span class="detail-value">${bottles800ml.toFixed(2)} ขวด</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">ราคารวม (1,000 มล.):</span>
            <span class="detail-value">${totalPrice.toLocaleString()} บาท</span>
        </div>
    `;
    
    resultDiv.style.display = 'block';
    
    // เพิ่มเอฟเฟกต์การเลื่อนไปยังผลลัพธ์
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ฟังก์ชันล้างข้อมูล
function clearInputs() {
    document.getElementById('bottles1000').value = '';
    document.getElementById('bottles800').value = '';
    document.getElementById('result').style.display = 'none';
    document.getElementById('bottles1000').focus();
}

// ฟังก์ชันจัดการการป้อนข้อมูล
function handleInputSync(input1, input2) {
    if (input1.value !== '') {
        input2.value = '';
    }
}

// ฟังก์ชันเริ่มต้น
function init() {
    // กำหนด event listeners
    document.getElementById('calculateBtn').addEventListener('click', calculate);
    document.getElementById('clearBtn').addEventListener('click', clearInputs);
    
    // อนุญาตให้กด Enter เพื่อคำนวณ
    document.getElementById('bottles1000').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            calculate();
        }
    });
    
    document.getElementById('bottles800').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            calculate();
        }
    });
    
    // เมื่อผู้ใช้ป้อนข้อมูลในช่องหนึ่ง ให้ล้างช่องอื่น
    document.getElementById('bottles1000').addEventListener('input', function() {
        handleInputSync(this, document.getElementById('bottles800'));
    });
    
    document.getElementById('bottles800').addEventListener('input', function() {
        handleInputSync(this, document.getElementById('bottles1000'));
    });
    
    // โฟกัสที่ช่องแรกเมื่อโหลดหน้าเว็บ
    document.getElementById('bottles1000').focus();
}

// เริ่มต้นแอปพลิเคชันเมื่อโหลดหน้าเว็บเสร็จ
document.addEventListener('DOMContentLoaded', init);
