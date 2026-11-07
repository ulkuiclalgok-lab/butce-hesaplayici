 let yonTLdenDovize = true; 

async function hesapla() {
    const miktarInput = document.getElementById("miktar").value;
    const miktar = parseFloat(miktarInput);
    const tur = document.getElementById("dovizTuru").value;
    const sonucDiv = document.getElementById("sonuc");

    sonucDiv.innerText = "Güncel kurlar çekiliyor...";

    try {
        const response = await fetch("https://open.er-api.com/v6/latest/TRY");
        const data = await response.json();
        const kurlar = data.rates;
        const hedefKur = kurlar[tur];

        if (!isNaN(miktar) && miktar > 0) {
            let hesaplanan;
            if (yonTLdenDovize) {
                hesaplanan = miktar * hedefKur;
                sonucDiv.innerText = miktar + " TL = " + hesaplanan.toFixed(2) + " " + tur;
            } else {
                hesaplanan = miktar / hedefKur;
                sonucDiv.innerText = miktar + " " + tur + " = " + hesaplanan.toFixed(2) + " TL";
            }
        } else {
            sonucDiv.innerText = "Lütfen geçerli bir sayı giriniz.";
        }
    } catch (hata) {
        sonucDiv.innerText = "Hata: Kur bilgisi alınamadı!";
    }
}

function yonDegistir() {
    yonTLdenDovize = !yonTLdenDovize;
    hesapla();
}