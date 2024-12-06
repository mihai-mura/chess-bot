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
import { Input } from "./ui/input";

export interface ChessGameSettings {
  playingColor: "white" | "black";
  depth: number;
  useAlphaBetaPruning: boolean;
  fen: string | null;
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
      fen: null,
    },
  });

  return (
    <Card className="w-[400px]">
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
            <FormField
              control={form.control}
              name="fen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Load FEN</FormLabel>
                  <div className="flex space-x-2">
                    <FormControl>
                      <Input
                        placeholder="Enter FEN string"
                        value={field.value ?? ""}
                        onChange={(value) => field.onChange(value)}
                      />
                    </FormControl>
                    <Button type="button" onClick={form.handleSubmit(onSubmit)}>
                      Load
                    </Button>
                  </div>
                  <FormDescription>
                    Load a specific board position using FEN notation.
                  </FormDescription>
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
