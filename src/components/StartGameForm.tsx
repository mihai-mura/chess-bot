"use client";

import { CircuitBoardIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Slider } from "~/components/ui/slider";
import { Switch } from "~/components/ui/switch";

export interface ChessGameSettings {
  playingColor: "white" | "black";
  depth: number;
  useAlphaBetaPruning: boolean;
}

interface ChessGameFormProps {
  onSubmit: (data: ChessGameSettings) => void;
}

export default function ChessGameForm({ onSubmit }: ChessGameFormProps) {
  const form = useForm<ChessGameSettings>({
    defaultValues: {
      playingColor: "white",
      depth: 3,
      useAlphaBetaPruning: true,
    },
  });

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CircuitBoardIcon className="h-6 w-6" />
          Start Chess Game
        </CardTitle>
        <CardDescription>Configure your game against the bot.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="playingColor"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Playing Color</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="white" />
                        </FormControl>
                        <FormLabel className="font-normal">White</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="black" />
                        </FormControl>
                        <FormLabel className="font-normal">Black</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="depth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Algorithm Depth: {field.value}</FormLabel>
                  <FormControl>
                    <Slider
                      className="hover:cursor-pointer"
                      min={2}
                      max={8}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormDescription>
                    Higher depth means stronger but slower AI.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="useAlphaBetaPruning"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Use Alpha-Beta Pruning</FormLabel>
                    <FormDescription>
                      Improves algorithm efficiency.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={form.handleSubmit(onSubmit)}>
          Start Game
        </Button>
      </CardFooter>
    </Card>
  );
}
