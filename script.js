(function() {
    const sendBtn = document.getElementById('sendGreetingBtn');
    const friendNameInput = document.getElementById('friendName');
    const customMsgInput = document.getElementById('customEidMsg');
    const customOutputDiv = document.getElementById('customOutput');
    const staticMsgDiv = document.getElementById('staticMessage');

    function generateCustomGreeting() {
        let friendName = friendNameInput.value.trim();
        let customMessage = customMsgInput.value.trim();

        if (friendName === "") friendName = "أخي الحبيب";
        if (customMessage === "") {
            customMessage = "أسأل الله لك السعادة والهناء، عيد فطر سعيد 🌙💚";
        }

        const finalGreeting = `🎉 إلى ${friendName} 🎉<br> ${customMessage}<br> 🌟 كل عام وأنت بألف خير 🌟`;
        customOutputDiv.innerHTML = finalGreeting;
        customOutputDiv.style.display = "block";
        customOutputDiv.style.backgroundColor = "#fff3e0";
        setTimeout(() => {
            customOutputDiv.style.backgroundColor = "#ffffffd9";
        }, 500);
    }

    function launchConfetti() {
        const symbols = ['🌟', '⭐', '🌙', '✨', '🎉', '🍬', '🌼', '💚', '🕌'];
        for (let i = 0; i < 45; i++) {
            const piece = document.createElement('div');
            piece.classList.add('confetti-piece');
            piece.innerText = symbols[Math.floor(Math.random() * symbols.length)];
            piece.style.fontSize = (Math.floor(Math.random() * 20) + 18) + 'px';
            piece.style.left = Math.random() * 100 + '%';
            piece.style.animationDuration = (Math.random() * 2.5 + 2) + 's';
            piece.style.animationDelay = (Math.random() * 1.5) + 's';
            document.body.appendChild(piece);
            setTimeout(() => piece.remove(), 4500);
        }
    }

    function getShareText() {
        let shareMsg = "";
        const customDivVisible = customOutputDiv.style.display === "block" && customOutputDiv.innerText.trim() !== "";
        if (customDivVisible) {
            let rawText = customOutputDiv.innerText.trim();
            shareMsg = `🕌 عيد فطر مبارك 🕌\n${rawText}\n\n${staticMsgDiv.innerText.substring(0, 100)}...`;
        } else {
            shareMsg = `🌙 عيد فطر مبارك سعيد 🌙\n${staticMsgDiv.innerText}\n\nتقبل الله منا ومنكم صالح الأعمال.`;
        }
        return shareMsg;
    }

    sendBtn.addEventListener('click', () => {
        generateCustomGreeting();
        launchConfetti();
    });

    document.getElementById('whatsappShare').addEventListener('click', () => {
        const encoded = encodeURIComponent(getShareText());
        window.open(`https://wa.me/?text=${encoded}`, '_blank');
    });

    document.getElementById('copyLinkBtn').addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(getShareText());
            const originalText = document.getElementById('copyLinkBtn').innerText;
            document.getElementById('copyLinkBtn').innerText = '✅ تم النسخ!';
            setTimeout(() => {
                document.getElementById('copyLinkBtn').innerText = originalText;
            }, 2000);
            alert("تم نسخ التهنئة! يمكنك لصقها وإرسالها لمن تحب.");
        } catch (err) {
            alert("الرجاء النسخ يدويًا، أو تحديث المتصفح");
        }
    });

    friendNameInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') generateCustomGreeting();
    });
    
    customMsgInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            generateCustomGreeting();
        }
    });

    window.addEventListener('load', () => {
        setTimeout(() => launchConfetti(), 300);
    });
})();
