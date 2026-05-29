document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const btnText = document.getElementById('btnText');
    const btnSpinner = document.getElementById('btnSpinner');
    const submitBtn = document.querySelector('.btn-login');

    // Aktifkan efek loading
    if (btnText && btnSpinner) {
        btnText.style.display = 'none';
        btnSpinner.style.display = 'inline';
    }
    if (submitBtn) submitBtn.disabled = true;

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Simulasi jeda loading seolah-olah menembak server selama 1 detik
    setTimeout(() => {
        // KAMU BISA MENENTUKAN USERNAME & PASSWORD BEBAS DI SINI UNTUK DEMO
        // Contoh: username "admin" dan password "12345" atau akun apa saja
        if (username === "admin" && password === "12345") {
            
            // Simpan username ke localStorage agar terbaca di halaman utama (welcome.js)
            localStorage.setItem("username", username);
            
            // Pindah ke halaman utama
            window.location.href = "../index.html";
            
        } else {
            // Jika username/password tidak cocok dengan akun simulasi
            const alertBox = document.getElementById("alertBox");
            if (alertBox) {
                alertBox.innerText = "Username atau Password salah (Gunakan admin/12345)";
                alertBox.className = "alert alert-danger text-center mb-3"; 
                alertBox.style.display = "block";

                setTimeout(() => {
                    alertBox.style.display = "none";
                }, 4000);
            }

            // Kembalikan tombol ke semula
            if (btnText && btnSpinner) {
                btnText.style.display = 'inline';
                btnSpinner.style.display = 'none';
            }
            if (submitBtn) submitBtn.disabled = false;
        }
    }, 1200);
});
