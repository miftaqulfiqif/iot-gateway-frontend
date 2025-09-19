import mqtt, { MqttClient } from "mqtt";

export class MqttManager {
  private client: MqttClient;

  constructor(private url: string) {
    this.client = mqtt.connect(this.url, {
      clientId: "mqtt-client-" + Math.random().toString(16).slice(2),
    });

    this.client.on("connect", () => {
      console.log("MQTT connected:", this.url);
    });

    this.client.on("error", (err) => {
      console.error("MQTT error:", err);
    });
  }

  subscribe(topic: string, callback: (msg: any) => void) {
    this.client.subscribe(topic);
    this.client.on("message", (receivedTopic, message) => {
      if (receivedTopic === topic) {
        try {
          callback(JSON.parse(message.toString()));
        } catch {
          callback(message.toString());
        }
      }
    });
  }

  unsubscribe(topic: string) {
    this.client.unsubscribe(topic);
  }

  getClient(): MqttClient {
    return this.client;
  }

  disconnect() {
    this.client.end();
  }
}
