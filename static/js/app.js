function buildCharts(sample){
  //this function builds the bar chart
   d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data)=>{
    console.log(data)
    
     //we are going to retrieve the sample data

        let samples = data.samples;
        //Filter the data based on the value of the sample
        let resultArray = samples.filter((sampleDictionary) =>sampleDictionary.id == sample);
        //    get the first index from the array
        let result = resultArray[0];
        //Get the Otu_ids, labels and sample values
        let otuIDs = result.otu_ids;
        let otuLabels = result.otu_labels;
        let sampleValues = result.sample_values;

         //Log the data to the console

    
        console.log(otuIDs, otuLabels, sampleValues);
        
        
        
        let bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin:  { t: 0},
            hovermode:  "closest",
            xaxis: { title:  "OTU ID"},
            margin: { t: 30}
        }; 
        let bubbleData = [
            {
                x: otuIDs,
                y: sampleValues,
                text: otuLabels,
                mode:"markers",
                marker: {
                    size:  sampleValues,
                    color: otuIDs,
                    colorscale: "Earth"
                }
            }
        ]
   


    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    //Select top ten items to display in descending order
    let yticks = otuIDs.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    let barData = [
       {
           
            y: yticks,
            x: sampleValues.slice(0,10).reverse(),
            text: otuLabels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
       }
   ]
    
    let barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: { t:30, l: 150},
     
    }
 
    Plotly.newPlot("bar", barData, barLayout)
   });

}
function buildMetadata(sample){
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let metadata = data.metadata; 

        let resultArray = metadata.filter(sampleDictionary => sampleDictionary.id == sample);

        let result = resultArray[0];

        let PANEL= d3.select("#sample-metadata");

        PANEL.html("");
    
        for(key in result) {
            PANEL.append("h6").text(`${key.toUpperCase()}:${result[key]}`)  
        }
        //bonus
        buildGauge(result.wfreq);

       })
       
    }
function optionChanged(newSample){
    buildCharts(newSample);
    buildMetadata(newSample);
}
function init(){
    let selector = d3.select("#selDataset");

    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data)=> {
       
    console.log(data.names);
    let sampleNames = data.names;

    for(let i = 0; i < sampleNames.length; i++){
        selector.append("option").text(sampleNames[i]).property("value", sampleNames[i]);
        }
    
//build initial plots
        let firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
        //buildBubbleChart(firstSample);
       
    })
    }



 init();
    