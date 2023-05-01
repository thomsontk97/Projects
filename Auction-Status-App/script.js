let url = "https://gauravgitacc.github.io/postAppData/auctionData.json";

fetch(url)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    // console.log(data);

    var container = document.getElementById("card-container");

    data.forEach((data) => {
      var status = data.status;
      var caseNumber = data.caseNumber;
      var date = data.date;
      var fromLocation = data.fromLocation;
      var toLocation = data.toLocation;
      var fare = data.fare;

      container.innerHTML += `
            <div class="card">
                <div class=${
                  status == "APPROVED"
                    ? "approved"
                    : status == "PENDING"
                    ? "pending"
                    : status == "COMPLETED"
                    ? "completed"
                    : status == "CANCELLED"
                    ? "cancelled"
                    : ""
                }>${status}</div>
                <div class="caseNumber">${caseNumber}</div>
                <div class="date">${date}</div>
                <hr/>
                <div class="fromLocation">${fromLocation}</div>
                <div class="toLocation">${toLocation}</div>
                <div class="fare">${fare}</div>
            </div>
        `;
    });
  });
