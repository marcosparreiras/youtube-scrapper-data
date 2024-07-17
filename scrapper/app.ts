import { SQSEvent } from 'aws-lambda';
import { z, ZodError } from 'zod';

export async function lambdaHandler(event: SQSEvent): Promise<void> {
    const recordSchema = z.array(
        z.object({
            url: z.string().url(),
        }),
    );

    try {
        const records = recordSchema.parse(
            event.Records.map((record) => ({
                url: JSON.parse(record.body).url,
            })),
        );

        for (let record of records) {
            console.log(record);
            // pegar html da url
            // extrair os dados relevantes deste html
            // publicar esses dados em um topico sns
        }
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            console.log(error.format());
            return;
        }
        if (error instanceof Error) {
            console.log(error.message);
            return;
        }
        console.log(error);
        return;
    }
}
