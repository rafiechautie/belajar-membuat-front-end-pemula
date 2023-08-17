const submitAction = document.getElementById('formDataDiri');

submitAction.addEventListener('submit', function (event) {
    const inputNama = document.getElementById('inputNama').value;
    const inputDomisili = document.getElementById('inputDomisili').value;
    const hiddenMessage = `Halo, ${inputNama}. Bagaimana cuacanya di ${inputDomisili}?`
   
    document.getElementById('messageAfterSubmit').innerText = hiddenMessage;
    /*
    Ketika kita melakukan proses submit pada form, halaman web akan melakukan proses refresh.
    Nah, event.preventDefault() akan mencegah proses refresh tersebut.
    */
    event.preventDefault();
  });