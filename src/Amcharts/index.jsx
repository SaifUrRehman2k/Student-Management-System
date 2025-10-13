import React, { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const Charts = ({ type = "line" }) => {
    const chartRef = useRef(null);
    const rootRef = useRef(null);

    useLayoutEffect(() => {
        if (!chartRef.current) return;

        if (rootRef.current) {
            try {
                rootRef.current.dispose();
            } catch (e) { }
            rootRef.current = null;
        }

        const root = am5.Root.new(chartRef.current);
        rootRef.current = root;
        root.setThemes([am5themes_Animated.new(root)]);

        const EMERALD = am5.color(0x19c880);
        const EMERALD_DARK = am5.color(0x15a86d);
        const GRAY_LABEL = am5.color(0x9ca3af);

        let chart;

        try {
            if (type === "line") {
                chart = root.container.children.push(
                    am5xy.XYChart.new(root, { panX: false, panY: false })
                );

                const xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
                xRenderer.labels.template.setAll({ fill: GRAY_LABEL });

                const xAxis = chart.xAxes.push(
                    am5xy.CategoryAxis.new(root, {
                        categoryField: "month",
                        renderer: xRenderer,
                    })
                );

                const yRenderer = am5xy.AxisRendererY.new(root, {});
                yRenderer.labels.template.setAll({ fill: GRAY_LABEL });

                const yAxis = chart.yAxes.push(
                    am5xy.ValueAxis.new(root, { renderer: yRenderer })
                );

                const series = chart.series.push(
                    am5xy.LineSeries.new(root, {
                        name: "Series",
                        xAxis,
                        yAxis,
                        valueYField: "value",
                        categoryXField: "month",
                    })
                );

                series.strokes.template.setAll({ stroke: EMERALD, strokeWidth: 2 });
                series.bullets.push(() =>
                    am5.Circle.new(root, { radius: 4, fill: EMERALD, stroke: EMERALD_DARK })
                );

                const data = [
                    { month: "Jan", value: 100 },
                    { month: "Feb", value: 120 },
                    { month: "Mar", value: 140 },
                    { month: "Apr", value: 160 },
                    { month: "May", value: 180 },
                    { month: "Jun", value: 200 },
                ];

                series.data.setAll(data);
                xAxis.data.setAll(data);
            } else if (type === "pie") {
                chart = root.container.children.push(am5percent.PieChart.new(root, {}));
                const series = chart.series.push(
                    am5percent.PieSeries.new(root, {
                        valueField: "value",
                        categoryField: "category",
                    })
                );

                if (series.colors) {
                    series.colors.set("colors", [
                        EMERALD,
                        am5.color(0x059669),
                        am5.color(0x34d399),
                        am5.color(0x6ee7b7),
                    ]);
                }

                series.slices.template.setAll({ stroke: am5.color(0x111827), strokeWidth: 1 });
                series.data.setAll([
                    { category: "Mathematics", value: 35 },
                    { category: "Science", value: 25 },
                    { category: "History", value: 20 },
                    { category: "Languages", value: 20 },
                ]);
            } else if (type === "column") {
                chart = root.container.children.push(
                    am5xy.XYChart.new(root, { panX: false, panY: false })
                );

                const xRenderer = am5xy.AxisRendererX.new(root, {});
                xRenderer.labels.template.setAll({ fill: GRAY_LABEL });

                const xAxis = chart.xAxes.push(
                    am5xy.CategoryAxis.new(root, { categoryField: "student", renderer: xRenderer })
                );

                const yRenderer = am5xy.AxisRendererY.new(root, {});
                yRenderer.labels.template.setAll({ fill: GRAY_LABEL });

                const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, { renderer: yRenderer }));

                const series = chart.series.push(
                    am5xy.ColumnSeries.new(root, {
                        xAxis,
                        yAxis,
                        valueYField: "score",
                        categoryXField: "student",
                    })
                );

                series.columns.template.setAll({ fill: EMERALD, stroke: EMERALD_DARK });

                const data = [
                    { student: "Student A", score: 85 },
                    { student: "Student B", score: 92 },
                    { student: "Student C", score: 78 },
                    { student: "Student D", score: 88 },
                    { student: "Student E", score: 95 },
                ];
                series.data.setAll(data);
                xAxis.data.setAll(data);
            }
        } catch (err) {
            console.error("amCharts init error:", err);
        }

        return () => {
            try {
                if (rootRef.current) {
                    rootRef.current.dispose();
                    rootRef.current = null;
                }
            } catch (e) { }
        };
    }, [type]);

    return (
        <div
            ref={chartRef}
            className="chart-container rounded-lg shadow-soft bg-white smooth p-3"
            style={{ width: "100%", height: 320 }}
        />
    );
};

export default Charts;





