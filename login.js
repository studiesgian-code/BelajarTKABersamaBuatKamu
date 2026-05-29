document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    // 1. Ambil elemen tombol dan spinner untuk efek loading
    const btnText = document.getElementById('btnText');
    const btnSpinner = document.getElementById('btnSpinner');
    const submitBtn = this.querySelector('.btn-login');

    // 2. Aktifkan efek loading & disable tombol agar tidak di-klik ganda
    if (btnText && btnSpinner) {
        btnText.style.display = 'none';
        btnSpinner.style.display = 'inline';
        if (submitBtn) submitBtn.disabled = true;
    }

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const res = await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `action=login&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        });

        const data = await res.json();

        if (data.status === "success") {
            // Simpan username ke localStorage
            localStorage.setItem("username", data.username);
            // Redirect ke beranda
            window.location.href = "../index.html";
        } else {
            // Jika login gagal dari API, tampilkan pesan error
            showError("Username atau Password salah, silakan coba lagi");
            resetButton();
        }
    } catch (error) {
        // Jika ada masalah jaringan atau API mati/CORS error
        console.error("Error login:", error);
        showError("Gagal terhubung ke server. Silakan coba beberapa saat lagi.");
        resetButton();
    }

    // Fungsi untuk menampilkan box alert error dengan styling Bootstrap agar jelas
    function showError(message) {
        const alertBox = document.getElementById("alertBox");
        if (alertBox) {
            alertBox.innerText = message;
            // Menambahkan kelas bootstrap agar tampilannya merah menyala khas alert error
            alertBox.className = "alert alert-danger text-center mb-3"; 
            alertBox.style.display = "block";

            setTimeout(() => {
                alertBox.style.display = "none";
            }, 4000);
        }
    }

    // Fungsi untuk mengembalikan tombol login ke kondisi semula
    function resetButton() {
        if (btnText && btnSpinner) {
            btnText.style.display = 'inline';
            btnSpinner.style.display = 'none';
            if (submitBtn) submitBtn.disabled = false;
        }
    }
});
