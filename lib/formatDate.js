export default function formatDate(data) {
    const isoCountries = require("i18n-iso-countries");
    isoCountries.registerLocale(require("i18n-iso-countries/langs/en.json"));
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
  
    const formattedData = data.map((item) => {
      const date1 = new Date(item.departure_date);
      const date2 = new Date(item.arrival_date);
      const formattedDate1 = date1.toLocaleDateString("id-ID", options);
      const formattedDate2 = date2.toLocaleDateString("id-ID", options);
      const diffs = Math.abs(date2 - date1);
      const diffsInHours = Math.floor(diffs / (1000 * 60 * 60));
      const diffsInMinutes = Math.floor((diffs / (1000 * 60)) % 60);
      let diffStr = "";
  
      if (diffsInHours > 0) {
        diffStr += `${diffsInHours} hour${diffsInHours > 1 ? "s" : ""}`;
      }
      if (diffsInMinutes > 0) {
        diffStr += `${diffStr ? " " : ""}${diffsInMinutes} minute${
          diffsInMinutes > 1 ? "s" : ""
        }`;
      }
  
      const arrival_code = isoCountries.getAlpha3Code(item.arrival_country, "en");
      const departure_code = isoCountries.getAlpha3Code(
        item.departure_country,
        "en"
      );
      return {
        ...item,
        departure_date: formattedDate1,
        arrival_date: formattedDate2,
        diffs: diffStr,
        arrival_code: arrival_code,
        departure_code: departure_code,
      };
    });
    console.log("formatted : ", formattedData);
    return formattedData;
  }