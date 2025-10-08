import React, { useLayoutEffect, useRef } from 'react'
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const StepCountChart = () => {

    const chartRef = useRef(null)

    useLayoutEffect(() => {
        let root = am5.Root.new(chartRef.current);

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        var chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            paddingLeft: 0,
            layout: root.verticalLayout
        }));

        // Add scrollbar
        // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
        chart.set("scrollbarX", am5.Scrollbar.new(root, {
            orientation: "horizontal"
        }));

        var data = [{
            "country": "USA",
            "year2004": 3.5,
            "year2005": 4.2
        }, {
            "country": "UK",
            "year2004": 1.7,
            "year2005": 3.1
        }, {
            "country": "Canada",
            "year2004": 2.8,
            "year2005": 2.9
        }, {
            "country": "Japan",
            "year2004": 2.6,
            "year2005": 2.3
        }, {
            "country": "France",
            "year2004": 1.4,
            "year2005": 2.1
        }, {
            "country": "Brazil",
            "year2004": 2.6,
            "year2005": 4.9
        }];

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var xRenderer = am5xy.AxisRendererX.new(root, {
            minGridDistance: 70,
            minorGridEnabled: true
        });

        var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            categoryField: "country",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {
                themeTags: ["axis"],
                animationDuration: 200
            })
        }));

        xRenderer.grid.template.setAll({
            location: 1
        })

        xAxis.data.setAll(data);

        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            min: 0,
            renderer: am5xy.AxisRendererY.new(root, {
                strokeOpacity: 0.1
            })
        }));

        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

        var series0 = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: "Income",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "year2004",
            categoryXField: "country",
            clustered: false,
            tooltip: am5.Tooltip.new(root, {
                labelText: "2004: {valueY}"
            })
        }));

        series0.columns.template.setAll({
            width: am5.percent(80),
            tooltipY: 0,
            strokeOpacity: 0
        });


        series0.data.setAll(data);


        var series1 = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: "Income",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "year2005",
            categoryXField: "country",
            clustered: false,
            tooltip: am5.Tooltip.new(root, {
                labelText: "2005: {valueY}"
            })
        }));

        series1.columns.template.setAll({
            width: am5.percent(50),
            tooltipY: 0,
            strokeOpacity: 0
        });

        series1.data.setAll(data);

        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));


        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        chart.appear(1000, 100);
        series0.appear();
        series1.appear();
    }, [])



    return (
        <div
            ref={chartRef}
            className='w-full h-full'
        >

        </div>
    )
}

export default StepCountChart
