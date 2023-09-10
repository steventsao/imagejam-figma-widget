import MyDropzone from "@/components/MyDropzone";
import {
  Container,
  Grid,
  Card,
  Image,
  Space,
  Text,
  Badge,
  Group,
} from "@mantine/core";

type SwingItem = {
  image_url: string;
};
// https://supabase.com/dashboard/project/tkbhdbhsnikrpsutyyxk/settings/api?
export default function MainSection({
  swingImages,
}: {
  swingImages: SwingItem[];
}) {
  return (
    <main className="flex flex-col dekstop:p-24">
      <section>
        {/* @ts-ignore */}
        <Container fluid>
          <Grid gutter={5}>
            {swingImages.map((item, i) => (
              // TODO use 6 for now for both desktop and mobile
              <Grid.Col xs={12} sm={6} md={4} key={i}>
                {/* TODO issue #11 */}
                {/* TODO should just pass in the URLs for all images so another query is not necessary in /swing/pages */}
                <Card shadow="sm" padding="xl" radius="md" withBorder>
                  <Card.Section>
                    <Image
                      placeholder="blurred"
                      src={item.image_url}
                      height={300}
                      // TODO hardcoding is not right
                      width={500}
                      alt={`golf swing ${i}`}
                    />
                  </Card.Section>
                  <Group position="apart" mt="md" mb="xs">
                    {/* <Text weight={500}>Norway Fjord Adventures</Text> */}
                    {/* Image or Video */}
                    <Badge color="pink" variant="light">
                      Image
                    </Badge>
                  </Group>

                  <Text size="sm" color="dimmed">
                    xxx Views
                  </Text>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </section>
      <Space h="xl" />
      <MyDropzone />
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="bottom-0 flex w-full m-4">
          <a
            className="pointer-events-none flex place-items-center gap-2 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            bogeybot
          </a>
        </div>
      </div>
    </main>
  );
}
