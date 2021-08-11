<template>
    <div>
        <Accordion>
            <AccordionTab
                v-for="timeSlot in timeSlots"
                :header="timeSlot.day.format('dddd (DD/MM/YYYY)')"
                :key="timeSlot.day.valueOf()"
            >
                <Button
                    v-for="slot in timeSlot.slots"
                    :key="slot.valueOf()"
                    :label="slot.format('HH:mm')"
                    class="p-mr-2"
                    @click="notifySelection(slot)"
                />
            </AccordionTab>
        </Accordion>
    </div>
</template>

<script>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Button from "primevue/button";
import dayjs from "dayjs";
require("dayjs/locale/pt-br");

export default {
    components: {
        Accordion,
        AccordionTab,
        Button,
    },
    props: {
        professional: Object,
        service: Object,
    },
    emits: ["time-selected"],
    data() {
        return {
            timeSlots: [],
        };
    },
    mounted() {
        dayjs.locale("pt-br");
        this.availableSlots();
    },
    methods: {
        availableSlots() {
            let availableDays = [];
            let firstDate = dayjs(new Date()); // first slot
            let currentDate = firstDate; // first slot
            // console.log(currentDate);

            for (let i = 0; i < 7; i++) {
                let availableSlots = [];
                currentDate = firstDate.add(i, "day");
                console.log("dia: ", currentDate.format("dddd"));

                let numSlots = 10;
                let currentSlot = currentDate
                    .set("hour", 10)
                    .set("minute", 0)
                    .set("second", 0);

                for (let j = 0; j < numSlots; j++) {
                    let newSlot = currentSlot.add(15, "minute");
                    // console.log(newSlot);
                    currentSlot = newSlot;
                    availableSlots.push(currentSlot);
                }

                availableDays.push({
                    day: currentDate,
                    // day: currentDate.toDate(),
                    // slots: availableSlots.map((dayjsInstance) =>
                    //     dayjsInstance.toDate()
                    // ),
                    slots: availableSlots,
                });
            }

            console.log("🚀 / availableDays", availableDays);

            this.timeSlots = availableDays;
        },
        notifySelection(timeSlot) {
            this.$emit("time-selected", timeSlot);
        },
    },
};
</script>

<style></style>
