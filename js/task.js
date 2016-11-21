$(() => {

    class Task {

        constructor(name, duration, tag) {

            if (!arguments.length) {
                this.autoLoad = false;
            } else {
                this.name = name;
                this.duration = duration;
                this.tag = tag;
            }
        }

        show() {
            let taghtml = "";

            $.each(this.tag, (key, value) => {
                taghtml += value + ', ';
            });

            let hourMin = this.duration.split(":");
            hourMin = parseInt(hourMin[0] * 60) + parseInt(hourMin[1]);
            console.log(hourMin);

            let res = '';

            switch (true) {
                case (hourMin <= 60)  :
                    res += '<tr class="success">';
                    break;

                case (hourMin <= 120)  :
                    res += '<tr class="info">';
                    break;

                case (hourMin <= 180)  :
                    res += '<tr class="warning">';
                    break;

                case (hourMin > 180)  :
                    res += '<tr class="danger">';
                    break;

                default :
                    res += '<tr>';
            }

            res += '<td>' + this.name + '</td>' + '<td>' + this.duration + '</td>' + '<td>' + taghtml + "</td></tr>";

            $('#tbody_task').append(res + '');
        }

        add_task(selector_button) {
            $(selector_button).on("click", (event) => {
                let duration = $('#duration').val();
                let name = $('#name').val();
                let tag = $('#tags').val().split(',');
                let t = new Task(name, duration, tag);

                t.show();
            });

        }
    }

    let t1 = new Task();
    t1.add_task('#add_task_button');

});