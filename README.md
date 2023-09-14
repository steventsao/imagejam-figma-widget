# About

database for your golf swings

# Challenges

As of 9/14, I find myself digging into researches on image labeling the past night, which would take me at least years to get proficient.

# Migrate DB

- `npx prisma migrate dev`
- `npx prisma generate`

# Premium offering

- anonymize your swing
- critique your swing

# Stack

- https://supabase.com/dashboard/project/tkbhdbhsnikrpsutyyxk/editor/28556

# Steps

1. Video has to be stabilized
2. Standard body ratio
3. Easy to share
4. Different Filters to view a video

# Data flow

- User uploads video
  - Client uploads to S3
    - Lambda on frame count

# Market research

- An existing app is V1 Golf, which sucks because you have to login before seeing anything. There's definitely marketing opportunities for free-access tools https://apps.apple.com/us/app/v1-golf-golf-swing-analyzer/id349715369
- Swingbot.com also is a login only site https://swingbot.com/video

- What does the viewing experience offer better than that of YouTube? It doesn't.

# Sources

- https://imagekit.io/dashboard
- https://vercel.com/steventsao-pro/bogeybot/deployments
- https://app.ahrefs.com/dashboard

# ML

- https://www.kaggle.com/code/marcmarais/golfer-detector-cropping
- https://arxiv.org/abs/1903.06528

- finetune blip

https://github.com/salesforce/BLIP/issues/37#issuecomment-1075764704
https://huggingface.co/ybelkada/blip-image-captioning-base-football-finetuned

- finetune openpose
  https://github.com/open-mmlab/mmpose
  https://cmu-perceptual-computing-lab.github.io/openpose/web/html/doc/index.html
