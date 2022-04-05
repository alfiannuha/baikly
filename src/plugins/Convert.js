import Vue from "vue"
import moment from "moment"
import 'moment/locale/id'

Vue.filter("date", function (value) {
  if (!value) return ""
  return moment(value).format("ddd, D MMM YYYY", "id")
})

Vue.filter("time", function (value) {
  if (!value) return ""
  return moment(value).format("HH:mm", "id")
})

Vue.filter("datetime", function (value) {
  if (!value) return ""
  return moment(value).format("D MMMM YYYY HH:mm:ss", "id")
})

Vue.filter("day", function (value) {
  if (!value) return ""
  return moment(value).format("ddd", "id")
})

Vue.filter("month", function (value) {
  if (!value) return ""
  return moment(value).format("MMMM", "id")
})

Vue.filter("year", function (value) {
  if (!value) return ""
  return moment(value).format("YYYY", "id")
})

Vue.filter("mounthYear", function (value) {
  if (!value) return ""
  return moment(value).format("MMMM YYYY", "id")
})

Vue.filter("millis", function (value) {
  let sec = Math.floor(value / 1000)
  let hrs = Math.floor(sec / 3600)
  sec -= hrs * 3600
  let min = Math.floor(sec / 60)
  sec -= min * 60

  sec = "" + sec
  sec = ("00" + sec).substring(sec.length)
  if (hrs > 0) {
    min = "" + min
    min = ("00" + min).substring(min.length)
    if (min > 0 && sec > 0) {
      return hrs + " jam " + min + " menit " + sec + " detik "
    } else if (min > 0 && sec < 1) {
      return hrs + " jam " + min + " menit "
    } else if (min < 1 && sec < 1) {
      return hrs + " jam "
    }
  } else if (min > 0) {
    if (sec > 0) {
      return min + " menit " + sec + " detik "
    } else {
      return min + " menit "
    }
  } else {
    return sec + " detik "
  }
})

Vue.filter("percent", (num) => {
  if (isNaN(num)) return "Not a Number"
  let price = ""
  const reverseNumber = num
    .toString()
    .split("")
    .reverse()
    .join("")
  const arrReverseNumber = [...Array(reverseNumber.length).keys()]
  arrReverseNumber.map(index => {
    if (index % 3 === 0) price += reverseNumber.substr(index, 3) + "."
  })

  return `${
    price.split("", price.length - 1)
    .reverse()
    .join("")
  } %`
})

Vue.filter("num_format", (number = 0, decimals = 0, decPoint = ',', thousandsSep = '.') => {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  let n = !isFinite(+number) ? 0 : +number;
  let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
  let sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep;
  let dec = (typeof decPoint === 'undefined') ? '.' : decPoint;
  let s = '';

  let toFixedFix = function (n, prec) {
      let k = Math.pow(10, prec);
      return '' + (Math.round(n * k) / k).toFixed(prec);
  }

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
})

Vue.filter("price", (number = 0, decimals = 0, decPoint = ',', thousandsSep = '.') => {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  let n = !isFinite(+number) ? 0 : +number;
  let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
  let sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep;
  let dec = (typeof decPoint === 'undefined') ? '.' : decPoint;
  let s = '';

  let toFixedFix = function (n, prec) {
      let k = Math.pow(10, prec);
      return '' + (Math.round(n * k) / k).toFixed(prec);
  }

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return `Rp ${s.join(dec)}`;
})

Vue.filter("account_number", (value) => {
  let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  let matches = v.match(/\d{4,16}/g);
  let match = matches && matches[0] || ''
  let parts = []

  for (let i=0, len=match.length; i<len; i+=4) {
      parts.push(match.substring(i, i+4))
  }

  if (parts.length) {
      return parts.join(' - ')
  } else {
      return value
  }
})

Vue.filter("phone_number", (value) => {
  let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  let matches = v.match(/\d{4,16}/g);
  let match = matches && matches[0] || ''
  let parts = []

  for (let i=0, len=match.length; i<len; i+=4) {
      parts.push(match.substring(i, i+4))
  }

  if (parts.length) {
      return parts.join('-')
  } else {
      return value
  }
})

Vue.filter("pricing", (num) => {
  if (isNaN(num)) return "Not a Number"
  let price = ""
  const reverseNumber = num
    .toString()
    .split("")
    .reverse()
    .join("")
  const arrReverseNumber = [...Array(reverseNumber.length).keys()]
  arrReverseNumber.map(index => {
    if (index % 3 === 0) price += reverseNumber.substr(index, 3) + "."
  })

  return `${
    price.split("", price.length - 1)
    .reverse()
    .join("")
  }`
})

Vue.filter("phone", function (value) {
  if (!value) return ""
  return value.substring(0, 4) + " - XXXX - XXXX"
})

Vue.filter("email", function (value) {
  if (!value) return ""
  return value.substring(0, 5) + "@XXXXX"
})

Vue.filter("address", function (value) {
  if (!value) return ""
  return value.substring(0, 10) + " . . ."
})

Vue.filter("title", function (value) {
  if (!value) return ""
  if (value.length > 70) {
    return value.substring(0, 70) + ' . . .'
  } else {
    return value
  }
})

Vue.filter("desc", function (value) {
  if (!value) return ""
  if (value.length > 150) {
    return value.substring(0, 150) + ' . . .'
  } else {
    return value
  }
})

Vue.filter("str_length10", function (value) {
  if (!value) return ""
  if (value.length > 10) {
    return value.substring(0, 10) + '. . .';
  }

  return value;
})

Vue.filter("str_length15", function (value) {
  if (!value) return ""
  if (value.length > 15) {
    return value.substring(0, 15) + ' . . .';
  }

  return value;
})

Vue.filter("str_length20", function (value) {
  if (!value) return ""
  if (value.length > 40) {
    return value.substring(0, 40);
  }

  return value;
})

Vue.filter("initial", function (value) {
  if (!value) return ""
  let splitName = value.split(" ")
  let initial = value.charAt(0)
  if(splitName[1] !== undefined) {
    initial += splitName[1].charAt(0)
  }

  return initial.toUpperCase()
})

Vue.filter("num_format", (number = 0, decimals = 0, decPoint = ',', thousandsSep = '.') => {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  let n = !isFinite(+number) ? 0 : +number;
  let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
  let sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep;
  let dec = (typeof decPoint === 'undefined') ? '.' : decPoint;
  let s = '';

  let toFixedFix = function (n, prec) {
      let k = Math.pow(10, prec);
      return '' + (Math.round(n * k) / k).toFixed(prec);
  }

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
})

Vue.filter("isPng", (urlImage) => {
  let fileName = urlImage.substring(urlImage.lastIndexOf('.')+1, urlImage.length) || urlImage;
  if(fileName == "png") {
    return true
  } else {
    return false
  }
})

Vue.filter("convertbilangan", function(bilangan) {

  bilangan    = String(bilangan);
  let angka   = new Array('0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
      kata    = new Array('','Satu','Dua','Tiga','Empat','Lima','Enam','Tujuh','Delapan','Sembilan'),
      tingkat = new Array('','Ribu','Juta','Milyar','Triliun'),
 
      panjang_bilangan = bilangan.length,
      kaLimat = "";
 
  /* pengujian panjang bilangan */
  if (panjang_bilangan > 15) {
    kaLimat = "Diluar Batas";
    return kaLimat;
  }
 
  /* mengambil angka-angka yang ada dalam bilangan, dimasukkan ke dalam array */
  for (i = 1; i <= panjang_bilangan; i++) {
    angka[i] = bilangan.substr(-(i),1);
  }
 
  let i = 1,
      j = 0;
  
 
 
  /* mulai proses iterasi terhadap array angka */
  while (i <= panjang_bilangan) {
 
    let subkaLimat = "",
        kata1 = "",
        kata2 = "",
        kata3 = "";
 
    /* untuk Ratusan */
    if (angka[i+2] != "0") {
      if (angka[i+2] == "1") {
        kata1 = "Seratus";
      } else {
        kata1 = kata[angka[i+2]] + " Ratus";
      }
    }
 
    /* untuk Puluhan atau Belasan */
    if (angka[i+1] != "0") {
      if (angka[i+1] == "1") {
        if (angka[i] == "0") {
          kata2 = "Sepuluh";
        } else if (angka[i] == "1") {
          kata2 = "Sebelas";
        } else {
          kata2 = kata[angka[i]] + " Belas";
        }
      } else {
        kata2 = kata[angka[i+1]] + " Puluh";
      }
    }
 
    /* untuk Satuan */
    if (angka[i] != "0") {
      if (angka[i+1] != "1") {
        kata3 = kata[angka[i]];
      }
    }
 
    /* pengujian angka apakah tidak nol semua, lalu ditambahkan tingkat */
    if ((angka[i] != "0") || (angka[i+1] != "0") || (angka[i+2] != "0")) {
      subkaLimat = kata1+" "+kata2+" "+kata3+" "+tingkat[j]+" ";
    }
 
    /* gabungkan variabe sub kaLimat (untuk Satu blok 3 angka) ke variabel kaLimat */
    kaLimat = subkaLimat + kaLimat;
    i = i + 3;
    j = j + 1;
 
  }
 
  /* mengganti Satu Ribu jadi Seribu jika diperlukan */
  if ((angka[5] == "0") && (angka[6] == "0")) {
    kaLimat = kaLimat.replace("Satu Ribu","Seribu");
  }
 
  return kaLimat + "Rupiah";
})

export default {
  moment
}