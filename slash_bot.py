import discord
from discord.ext import commands
from discord_slash import SlashCommand, SlashContext
from discord_slash.utils.manage_commands import create_option
import subprocess

with open('./scrt/D.token') as f:
    token = f.read()

with open('./scrt/D.guild') as f:
    guild_id = [int(f.read().replace('\n',''))]

bot = commands.Bot(command_prefix='/' ,intents=discord.Intents.all())

slash = SlashCommand(bot,sync_commands=True)

@slash.slash(guild_ids=guild_id,
             name='Hello',
             description='This is just a test command, nothing more.',
            )
async def test(ctx:SlashContext):
    await ctx.send(content="Hello World!")

@slash.slash(guild_ids=guild_id,
             name='readTest',
             description='test for read data of specified posision in the spreadsheet.',
             options=[
	         create_option(
                     name='row',
                     description='set the row number you want to pick',
                     option_type=4,
                     required=True,
                 ),
                 create_option(
		     name='column',
		     description='set the column number you want to pick',
		     option_type=4,
                     required=True,
                 ),
             ],
            )
async def readTest(ctx,row , column):
    await ctx.defer()
    result = subprocess.check_output(
                                     ['clasp','run','readTest','-p','['+str(row)+','+str(column)+']'],
				     shell = False,
				     cwd = './clasp/',
                                    ).decode().split(':boundary:')[-1]
    print(result)
    await ctx.send(result)

@slash.slash(guild_ids=guild_id,
             name='createForm',
             description='create a Google form for attendance confirmation',
             options=[
                 create_option(
                         name='forced',
                         description="force ansering progress",
                         option_type=5,
                         required=False,
                 ),
             ],
            )
async def create(ctx,forced=False):
    await ctx.defer()
    bool = 'true' if forced else 'false'
    result = subprocess.check_output(
                                     ['clasp','run','formCreate','-p',bool],
                                     shell=False,
                                     cwd="./clasp/",
                                     ).decode().split(":boundary:")[-1]
    await ctx.send(result)

bot.run(token)
