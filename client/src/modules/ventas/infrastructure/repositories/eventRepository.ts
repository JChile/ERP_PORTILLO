import { EventEntity } from "../entities/EventEntity";

abstract class EventRepository {
   abstract getEvents(): Promise<EventEntity[]>;
   abstract getEventById(): Promise<EventEntity>;
   abstract getEventsByAsesor(): Promise<EventEntity[]>;
}