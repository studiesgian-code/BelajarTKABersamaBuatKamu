document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    // 1. Ambil elemen tombol dan spinner
    const btnText = document.getElementById('btnText');
    const btnSpinner = document.getElementById('btnSpinner');
    const submitBtn = document.querySelector('.btn-login'); // Diperbaiki agar langsung mencari class tombol

    // 2. Aktifkan efek loading
    if (btnText && btnSpinner) {
        btnText.style.display = 'none';
        btnSpinner.style.display = 'inline';
    }
    if (submitBtn) {
        submitBtn.disabled = true;
    }

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Fungsi pembantu untuk mengembalikan tombol ke awal
    function resetButton() {
        if (btnText && btnSpinner) {
            btnText.style.display = 'inline';
            btnSpinner.style.display = 'none';
        }
        if (submitBtn) {
            submitBtn.disabled = false;
        }
    }

    // Fungsi pembantu untuk memunculkan pesan error
    function showError(message) {
        const alertBox = document.getElementById("alertBox");
        if (alertBox) {
            alertBox.innerText = message;
            alertBox.className = "alert alert-danger text-center mb-3"; 
            alertBox.style.display = "block";

            setTimeout(() => {
                alertBox.style.display = "none";
            }, 4000);
        } else {
            // Cadangan jika alertBox html tidak terbaca
            alert(message);
        }
    }

    try {
        const res = await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `action=login&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        });

        // Cek jika status HTTP bukan 200 OK
        if (!res.ok) {
            throw new Error(`Server bermasalah (Status: ${res.status})`);
        }

        const data = await res.json();

        if (data.status === "success") {
            localStorage.setItem("username", data.username);
            window.location.href = "../index.html";
        } else {
            showError("Username atau Password salah, silakan coba lagi");
            resetButton();
        }
    } catch (error) {
        console.error("Detail Error:", error);
        showError("Gagal terhubung ke server atau API mati. Silakan periksa koneksi atau console (F12).");
        resetButton(); // Memastikan tombol "Memuat..." berganti kembali jadi "Masuk" jika jaringan error
    }
});
