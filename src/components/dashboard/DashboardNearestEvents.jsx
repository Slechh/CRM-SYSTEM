import clsx from "clsx";
import { templateEvent } from "../../constants/templateEvent";
import { Icon } from "../Icon";

export function DashboardNearestEvents() {
  return (
    <div className="flex px-[18px] py-7 bg-bgBlock rounded-3xl">
      <div className="flex flex-col gap-6">
        <h2 className="text-[22px] font-bold">Nearest Events</h2>
        <div className="flex flex-col gap-6">
          {templateEvent.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

function EventCard({ event }) {
  return (
    <div className="w-[293px] h-[104px] pt-1 pl-4 pr-0.5 pb-1.5 relative">
      <div
        className={clsx(
          "w-1 h-full absolute top-0 left-[-1px] rounded-xl",
          event.eventLineColor
        )}
      ></div>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center">
          <span className="font-bold">{event.eventName}</span>
          <Icon
            id="arrow-right"
            className={clsx("w-4 h-4 -rotate-90", event.eventArrowColor)}
          />
        </div>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-sm text-cardText">{event.eventDate}</span>
          <div className="py-1.5 px-2 bg-bgApp rounded-xl flex gap-1.5 text-cardText">
            <Icon id="clock" className="w-5 h-5" />
            <span>{event.eventTimeEnd}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
