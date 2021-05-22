import discord
from discord.ext import commands
from discord_slash import SlashCommand, SlashContext

with open('./scrt/D.token') as f:
    token = f.read()

with open('./scrt/D.guild') as f:
    guild_id = [int(f.read().replace('\n',''))]

bot = commands.Bot(command_prefix='/' ,intents=discord.Intents.all())

slash = SlashCommand(bot)

@slash.slash(guild_ids=guild_id, 
                 name='Hello',
                 description='This is just a test command, nothing more.',
                )

async def test(ctx:SlashContext):
    await ctx.send(content="Hello World!")

bot.run(token)
