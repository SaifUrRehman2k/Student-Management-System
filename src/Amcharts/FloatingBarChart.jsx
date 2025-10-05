// FloatingBarChart.jsx
import React, { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const FloatingBarChart = () => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    root.interfaceColors.set("text", am5.color(0xffffff));
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout,
        paddingLeft: 0,
      })
    );

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      })
    );

    const colors = chart.get("colors");

    const data = [
      {
        name: "Tasks",
        startTime: 8,
        endTime: 11,
        columnSettings: {
          stroke: colors.getIndex(1),
          fill: colors.getIndex(1),
        },
      },
      {
        name: "Assignments",
        startTime: 10,
        endTime: 13,
        columnSettings: {
          stroke: colors.getIndex(3),
          fill: colors.getIndex(3),
        },
      },
      {
        name: "Quizes",
        startTime: 11,
        endTime: 18,
        columnSettings: {
          stroke: colors.getIndex(5),
          fill: colors.getIndex(5),
        },
      },
      {
        name: "Grade",
        startTime: 15,
        endTime: 19,
        columnSettings: {
          stroke: colors.getIndex(7),
          fill: colors.getIndex(7),
        },
      },
    ];

    const yRenderer = am5xy.AxisRendererY.new(root, {
      minorGridEnabled: true,
    });

    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "name",
        renderer: yRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    yRenderer.grid.template.setAll({ location: 1 });
    yAxis.data.setAll(data);

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {
          strokeOpacity: 0.1,
          minGridDistance: 60,
        }),
      })
    );

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Income",
        xAxis: xAxis,
        yAxis: yAxis,
        openValueXField: "startTime",
        valueXField: "endTime",
        categoryYField: "name",
        sequencedInterpolation: true,
      })
    );

    series.columns.template.setAll({
      height: am5.percent(40),
      templateField: "columnSettings",
      tooltipText: "[bold]{name}[/]\n{categoryY}: {valueX}",
    });

    series.data.setAll(data);

    series.appear();
    chart.appear(1000, 100);

    return () => root.dispose();
  }, []);

  return (
    
      <div id="chartdiv" ref={chartRef} className="w-full h-[80%] text-white"></div>
    
  );
};

export default FloatingBarChart;
