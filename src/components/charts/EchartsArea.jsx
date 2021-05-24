/**
 * Created by hao.cheng on 2017/4/17.
 */
import React from "react";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";
import { getCase } from "../../axios";
// let base = +new Date(1968, 9, 3);
// let oneDay = 24 * 3600 * 1000;
// let date = [];
// let data = [];

// let data = [Math.random() * 300];

// for (var i = 1; i < 20000; i++) {
//   var now = new Date((base += oneDay));
//   date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"));
//   data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
// }
// console.log(date)
// console.log(data)

const option = {
  tooltip: {
    trigger: "axis",
    position: function(pt) {
      return [pt[0], "10%"];
    },
  },
  title: {
    left: "left",
    text: "FPS",
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: "none",
      },
      restore: {},
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [],
  },
  yAxis: {
    type: "value",
    boundaryGap: [0, "100%"],
  },
  dataZoom: [
    {
      type: "inside",
      start: 0,
      end: 10,
    },
    {
      start: 0,
      end: 10,
      handleIcon:
        "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
      handleSize: "80%",
      handleStyle: {
        color: "#fff",
        shadowBlur: 3,
        shadowColor: "rgba(0, 0, 0, 0.6)",
        shadowOffsetX: 2,
        shadowOffsetY: 2,
      },
    },
  ],
  series: [
    {
      name: "FPS",
      type: "line",
      smooth: true,
      symbol: "none",
      sampling: "average",
      itemStyle: {
        normal: {
          color: "rgb(255, 70, 131)",
        },
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255, 158, 68)",
            },
            {
              offset: 1,
              color: "rgb(255, 70, 131)",
            },
          ]),
        },
      },
      data: [],
    },
  ],
};

const line_stack_option = {
  title: {
    text: "Memory",
  },
  tooltip: {
    trigger: "axis",
    // 提示信息的位置,对应位置坐标
    position: function(pt) {
      return [pt[0], "10%"];
    },
    axisPointer: {
      snap: true,
      label: {
        show: true,
      },
    },
    formatter: params => {
      return (
        `
          <div>
            <p>${params[0].name}</p>
            <p>${params[0].marker}${params[0].seriesName}: ${params[0].value}MB</p>
            <p>${params[1].marker}${params[1].seriesName}: ${params[1].value}MB</p>
            <p>${params[2].marker}${params[2].seriesName}: ${params[2].value}MB</p>
            <p>${params[3].marker}${params[3].seriesName}: ${params[3].value}MB</p>
          </div>
        `
      )
    },
  },
  legend: {
    data: ["TotalMemory", "MonoMem", "GFXMem", "TextureMem"],
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [],
  },
  yAxis: {
    type: "value",
  },
  series: [],
};

class EchartsArea extends React.Component {
  state = {
    fps_option: option,
    mem_option: line_stack_option,
  };

  componentDidMount() {
    getCase("1-4zhangjie0521").then((r) => {
      console.log(r);
      this.setState({
        fps_option: {
          title: {
            text: "FPS",
          },
          xAxis: {
            data: r.data["items"]["Frames"],
          },
          series: {
            data: r.data["items"]["FPS"],
          },
        },
        mem_option: {
          title: {
            text: "Memory",
          },
          xAxis: {
            data: r.data["items"]["Frames"],
          },
          series: [
            {
              name: "TotalMemory",
              type: "line",
              data: r.data["items"]["Mem"]["Total"],
            },
            {
              name: "MonoMem",
              type: "line",
              data: r.data["items"]["Mem"]["MonoMem"],
            },
            {
              name: "GFXMem",
              type: "line",
              data: r.data["items"]["Mem"]["GFXMem"],
            },
            {
              name: "TextureMem",
              type: "line",
              data: r.data["items"]["Mem"]["TextureMem"],
            },
          ],
        },
      });
    });
  }

  render() {
    return (
      <>
        <ReactEcharts
          option={this.state.fps_option}
          style={{ height: "300px", width: "100%" }}
          className={"react_for_echarts"}
        />
        <ReactEcharts
          option={this.state.mem_option}
          style={{ height: "300px", width: "100%" }}
          className={"react_for_echarts"}
        />
      </>
    );
  }
}

export default EchartsArea;
