import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import $ from  'jquery'

function Ajax() {
    $.ajax({
        url: `http://qt.gtimg.cn/q=sh000001,sz399001,sz399006,sh000016,sh000300,sh000688`,
        method: 'get',
        async: false,
        success: function (res) {
            var stock = res.split(';');
            var message1 = stock[0].split('~');
            var message2 = stock[1].split('~');
            var message3 = stock[2].split('~');
            var message4 = stock[3].split('~');
            var message5 = stock[4].split('~');
            var message6 = stock[5].split('~');

            // document.getElementById("sz1").innerHTML=message1[3];
            // document.getElementById("sz2").innerHTML=message1[31];
            // document.getElementById("sz3").innerHTML=message1[32]+"%";
            // alert(message1[2]);
            return message1;
        }
    })
}


const App = () => {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    Ajax();

    return (
        <>
            
            <Button type="primary">
                Open
            </Button>
            <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
            <div id="sz1">{setInterval("document.getElementById('sz1').innerHTML=Ajax();", 1000)}
            </div>
            <script></script>
        </>
        
    );
};

export default App;