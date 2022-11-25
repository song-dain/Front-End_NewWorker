import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

class EmpCalendar extends Component {

    render() {

      const onClickTest = () => {
        console.log('이벤트 테스트')
      }

        return (
          <div className="App">
            <FullCalendar 
              defaultView="dayGridMonth" 
              plugins={[ dayGridPlugin ]}
              events={[
                {
                  title: 'test event', 
                  start: '2022-11-24',
                  end: '2022-11-24'
                }
              ]}
              eventClick={ onClickTest }
            />
          </div>
        );
    }
}
export default EmpCalendar;