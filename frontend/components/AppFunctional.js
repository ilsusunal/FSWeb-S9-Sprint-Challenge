import React, { useState } from 'react'

// önerilen başlangıç stateleri
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.
  const [index, setIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);

  function getXY() {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.  
    const uceBolumdenKalan = index % 3;
    const uceBolum = index / 3;
    const x = uceBolumdenKalan + 1;
    const y = Math.floor(uceBolum) + 1;
    return {x,y};
  }

  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
    const {x, y} = getXY();
    return `Koordinatlar (${x}, ${y})`;
  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
    setIndex(initialIndex);
    setSteps(initialSteps);
    setMessage(initialMessage);
    setEmail(initialEmail);
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.
    const yonDegerleri = {
      sag: +1,
      sol: -1,
      asagi: +3,
      yukari: -3,
    }
    const sonrakiIndexDegeri = index + yonDegerleri[yon];
    if (yon === "sol" && index % 3 === 0) {
      setMessage("Sola gidemezsiniz")
      setSteps(prevSteps => prevSteps)
      return index;
    } else if (yon === "sag" && index % 3 === 2) {
      setMessage("Sağa gidemezsiniz")
      setSteps(prevSteps => prevSteps)
      return index;
    } else if (yon === "yukari" && index < 3) {
      setMessage("Yukarıya gidemezsiniz")
      setSteps(prevSteps => prevSteps)
      return index;
    } else if (yon === "asagi" && index >= 6) {
      setMessage("Aşağıya gidemezsiniz")
      setSteps(prevSteps => prevSteps)
      return index;
    } else {
      setMessage(initialMessage);
      setSteps(prevSteps => prevSteps + 1)
      return sonrakiIndexDegeri;
    }
  }

  function ilerle(evt) {
    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
    const yeniIndex = sonrakiIndex(evt);
   
    setIndex(yeniIndex);
  }

  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
  }

  function onSubmit(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMesaj()}</h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => ilerle("sol")}>SOL</button>
        <button id="up" onClick={() => ilerle("yukari")} >YUKARI</button>
        <button id="right" onClick={() => ilerle("sag")}>SAĞ</button>
        <button id="down" onClick={() => ilerle("asagi")}>AŞAĞI</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="email girin"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
