import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { useQuery, gql } from '@apollo/client';
import { listSurveys } from '../graphql/queries';

interface SurveyData {
    modeOption: string
    stateOption: string
}

function ChartComponent() {
    // Queries all surveys every pollInterval milliseconds
    const { loading, error, data } = useQuery(gql(listSurveys), {
        pollInterval: 2000
    });

    // Survey Value States
    const [surveyState, setSurveyState] = useState({
        lightCount: 0,
        darkCount: 0,
        contextCount: 0,
        reduxCount: 0,
        mobxCount: 0,
        recoilCount: 0,
        otherCount: 0,
    })
    // Destructured
    const {contextCount, reduxCount, mobxCount, recoilCount, otherCount} = surveyState;

    // Clicked segment state tracker
    const [selectedIndex, setSelectedIndex] = useState(99);

    // Once data received, updates State if any values changed
    // Filters surveys for number of response answers
    useEffect(() => {
        if (!loading) {
            setSurveyState((prevState) => ({
                ...prevState, 
                lightCount: data.listSurveys.items.filter((obj: SurveyData) => obj.modeOption === 'light').length,
                darkCount: data.listSurveys.items.filter((obj: SurveyData) => obj.modeOption === 'dark').length,
                contextCount: data.listSurveys.items.filter((obj: SurveyData) => obj.stateOption === 'context').length,
                reduxCount: data.listSurveys.items.filter((obj: SurveyData) => obj.stateOption === 'redux').length,
                mobxCount: data.listSurveys.items.filter((obj: SurveyData) => obj.stateOption === 'mobx').length,
                recoilCount: data.listSurveys.items.filter((obj: SurveyData) => obj.stateOption === 'recoil').length,
                otherCount: data.listSurveys.items.filter((obj: SurveyData) => obj.stateOption === 'other').length,
            }));
        }
    }, [loading, data])

    // On pie segment click
    const onSegmentClickHandler = (e: React.MouseEvent<Element, MouseEvent>, index: number) => {
        setSelectedIndex(index);

        // Clicking same segment as selected resets to default
        if (index === selectedIndex) {
            setSelectedIndex(99);
        }
    }

    // Returns percent total & value of survey response
    const calculateSegmentDisplay = (stateCount: number) => {
        const stateSurveyTotal = contextCount + reduxCount + mobxCount + recoilCount + otherCount;
        return `${(stateCount / stateSurveyTotal * 100).toFixed(2)}% (${stateCount})`
    }

    return (
        <div style={styles.chartContainer}>
            {
                error ? <div>Error getting data..</div> :
                loading ? <div>Loading..</div> :
                <>
                    <h2>State Preference Survey Results</h2>
                    <PieChart
                        style={{
                            overflow: 'visible',
                            maxWidth: '343px',
                        }}
                        
                        // If segment is selected, display number value of survey
                        data={[
                            {
                                title: selectedIndex === 0 ? calculateSegmentDisplay(reduxCount) : 'Redux',
                                value: reduxCount,
                                color: 'red'
                            }, 
                            {
                                title: selectedIndex === 1 ? calculateSegmentDisplay(mobxCount) : 'MobX',
                                value: mobxCount,
                                color: 'blue'
                            }, 
                            {
                                title: selectedIndex === 2 ? calculateSegmentDisplay(contextCount) : 'Context',
                                value: contextCount,
                                color: 'yellow'
                            },
                            {
                                title: selectedIndex === 3 ? calculateSegmentDisplay(recoilCount) : 'Recoil',
                                value: recoilCount,
                                color: 'green'
                            },
                            {
                                title: selectedIndex === 4 ? calculateSegmentDisplay(otherCount) : 'Other',
                                value: otherCount,
                                color: 'orange'
                            }
                        ]}

                        onClick={(e, segmentIndex) => onSegmentClickHandler(e, segmentIndex)}
                        label={({dataEntry}) => `${dataEntry.title}`}
                        labelPosition={110}
                        segmentsShift={(index) => index === selectedIndex ? 5 : 0}
                        labelStyle={{...defaultLabelStyle}}
                        lineWidth={40}
                        animate={true}
                    />
                </>
            }
        </div>
    );
}

const defaultLabelStyle = {
    fontSize: '5px',
    fontFamily: 'sans-serif',
}

const styles = {
    chartContainer: {
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'center',
        height: '500px',
        width: '500px',
        marginTop: '150px',
        marginLeft: '20px',
        padding: '25px',
        background: 'lightblue',
        borderRadius: '8px',
        border: '1px solid black',
        boxShadow: '3px 3px 3px darkgray',
    }
}

export default ChartComponent;