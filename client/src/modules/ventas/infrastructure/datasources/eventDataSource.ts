import { EventEntity } from "../entities/EventEntity";

abstract class EventDataSource {
   abstract getEvents(): Promise<EventEntity[]>;
   abstract getEventById(): Promise<EventEntity>;
   abstract getEventsByAsesor(): Promise<EventEntity[]>;
}