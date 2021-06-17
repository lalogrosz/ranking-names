import React, { useRef } from "react";

const DuplicatedBarGraph = ({
    title,
    data
}) => {

    let canvasRef = useRef(null);;

    const createBarChart = (data) => {
        var ctx = canvasRef.getContext("2d");

        new Chart(ctx, {
          type: "bar",
          data: {
            labels: data.labels,
            datasets: [{
              label: "Total",
              tension: 0.4,
              borderWidth: 0,
              pointRadius: 0,
              backgroundColor: "#fff",
              data: data.values,
              maxBarThickness: 10
            }, ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            tooltips: {
              enabled: true,
              mode: "index",
              intersect: false
            },
            scales: {
              yAxes: [{
                gridLines: {
                  display: false
                },
                ticks: {
                  suggestedMin: 0,
                  beginAtZero: true,
                  precision:0,
                  padding: 0,
                  fontSize: 14,
                  lineHeight: 3,
                  fontColor: "#fff",
                  fontStyle: 'normal',
                  fontFamily: "Open Sans",
                },
              }, ],
              xAxes: [{
                gridLines: {
                  display: false
                },
                ticks: {
                  fontColor: '#fff',
                  display: true,
                  padding: 20
                },
              }, ],
            },
          },
        });
    };

    React.useEffect(() => {
        createBarChart(data);
    }, []);


    return (
        <div className="col-lg-6 mb-lg-0 mb-4">
            <div className="card">
                <div className="card-body p-3">
                <h6 className="ms-2 mb-1 mb-0">{title}</h6>
                <div className="bg-gradient-dark border-radius-lg py-3 pe-1 mb-3">
                    <div className="chart">
                    <canvas ref={el => canvasRef = el} className="chart-canvas" height="350px"></canvas>
                    </div>
                </div>
                
                </div>
            </div>
        </div>
    );
};

export default DuplicatedBarGraph;